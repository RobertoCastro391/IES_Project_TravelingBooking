import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./hotelcheckout.css";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import visa from "../../components/images/visa.png";
import mastercard from "../../components/images/master-card.png";
import card from "../../components/images/card.png";
import cancelation from "../../components/images/cancelation.png";
import { useNavigate } from "react-router-dom";
import HotelCard from "../../components/cardHotel/CardHotel";
import { useLocation } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const HotelCheckout = ({ hotel }) => {
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cardExpirationDate, setCardExpirationDate] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bag, setbag] = useState("");
  const [pricehotel, setPricehotel] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [optionalPrice, setOptionalPrice] = useState(0);
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const hotelData = location.state?.hotel;
  const dates = location.state?.dates;
  const hotelOptions = location.state?.hotelOptions;
  const [notificationFlight, setNotificationFlight] = useState(null);
  const [showNotificationFlight, setShowNotificationFlight] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  console.log("hotelData");
  console.log(hotelData);

  console.log("dates");
  console.log(dates);
  const fetchFlight = async (flightNumber) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/flights/flightCheckout/${flightNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    const stompClient = Stomp.over(
      // () => new SockJS(`${process.env.REACT_APP_API_URL}/ws`)
      () => new SockJS(`${process.env.REACT_APP_API_URL}/ws`)
    );

    stompClient.connect({}, (frame) => {
      stompClient.subscribe("/topic/flightPriceUpdate", async (message) => {
        const flightPriceUpdate = JSON.parse(message.body);
        console.log("New Flight Price:", flightPriceUpdate);
        const flight = await fetchFlight(flightPriceUpdate.flightNumber);
        console.log("New Flight:", flight);
        setNotificationMessage(`New Price: ${flightPriceUpdate.price}`);
        setNotificationFlight(flight);
        setShowNotificationFlight(true);
      });
    });

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    if (showNotificationFlight) {
      setTimeout(() => {
        setShowNotificationFlight(false);
      }, 7000);
    }
  }, [showNotificationFlight]);

  useEffect(() => {
    if (hotelOptions) {
      const adultPassengers = Array.from(
        { length: hotelOptions.adult },
        () => ({
          type: "Adult",
          firstName: "",
          lastName: "",
          sex: "",
          nationality: "",
          birthDate: "",
          passportNumber: "",
        })
      );

      const childPassengers = Array.from(
        { length: hotelOptions.children },
        () => ({
          type: "Children",
          firstName: "",
          lastName: "",
          sex: "",
          nationality: "",
          birthDate: "",
          passportNumber: "",
        })
      );

      setPassengers([...adultPassengers, ...childPassengers]);
    }
  }, [hotelOptions]);

  const handleCheckout = async () => {
    console.log("hotelData");
    console.log(hotelData);
    console.log("dates");
    console.log(dates);

    const reservationData = {
      userID: parseInt(localStorage.getItem("userId")),
      hotelId: hotelData.hotelID,
      totalPrice: hotelData.initialPrice,
      reservationDate: new Date().toISOString(),
      passengers: passengers,
      emailContact: email,
      phoneContact: phoneNumber,
      nameCard: cardName,
      numberCard: cardNumber,
      expirationDateCard: cardExpirationDate,
      cvvCard: cvv,
      addressCard1: addressLine1,
      addressCard2: addressLine2 ? addressLine2 : null,
      cityCard: city,
      zipCodeCard: postalCode,
      countryCard: country,
    };

    console.log("Reservation data:", reservationData);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/hotels/createReservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Reservation successful:", responseData);
      alert(
        `You have successfully booked your hotel!\nYour confirmation conde is ${responseData.reservationId}\nThank you for choosing TravellingBooking by IES!`
      );
      navigate("/"); // Redirect to home or confirmation page
    } catch (error) {
      console.error("Error in making reservation:", error.Error);
      alert("Failed to book the hotel. Please try again.");
    }
  };

  const handleGenderChange = (event) => {
    setSex(event.target.value);
  };

  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  console.log("passengers");
  console.log(passengers);

  return (
    <div>
      <Navbar />
      <div className="containerCheckout">
        <div className="container1">
          <p style={{ fontSize: "25px" }}>
            GUESTS
            <FontAwesomeIcon
              style={{ marginLeft: "0.5%" }}
              icon={faInfoCircle}
            />
          </p>
          <p style={{ fontWeight: "300", marginTop: "1%", color: "black" }}>
            Please enter the information about the guests
          </p>

          {passengers.map((passenger, index) => (
            <div key={index}>
              <p style={{ fontWeight: "bold", marginTop: "20px" }}>
                {passenger.type} {index + 1}
              </p>
              <input
                id="firstName"
                type="text"
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  height: "40px",
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                placeholder="Enter your first name"
                value={passenger.firstName}
                onChange={(e) =>
                  handleInputChange(index, "firstName", e.target.value)
                }
                required
              />
              <input
                id="lastName"
                type="text"
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  height: "40px",
                  width: "100%",
                  marginBottom: "20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                placeholder="Enter your last name"
                value={passenger.lastName}
                onChange={(e) =>
                  handleInputChange(index, "lastName", e.target.value)
                }
                required
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <select
                  value={passenger.sex}
                  onChange={(e) =>
                    handleInputChange(index, "sex", e.target.value) &&
                    handleGenderChange(e.target.value)
                  }
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    height: "44px",
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  <option>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <input
                  id="nationality"
                  type="text"
                  style={{
                    flex: 1,
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    height: "40px",
                    width: "100%",
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  placeholder="Enter your nationality"
                  value={passenger.nationality}
                  onChange={(e) =>
                    handleInputChange(index, "nationality", e.target.value)
                  }
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  id="birthDate"
                  type="date"
                  style={{
                    flex: 1,
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    height: "40px",
                    width: "100%",
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  placeholder="Enter your date of birth"
                  value={passenger.birthDate}
                  onChange={(e) =>
                    handleInputChange(index, "birthDate", e.target.value)
                  }
                  required
                />

                <input
                  id="passportNumber"
                  type="text"
                  style={{
                    flex: 1,
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    height: "40px",
                    width: "100%",
                    marginLeft: "100px",
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  placeholder="Enter your passport number"
                  value={passenger.passportNumber}
                  onChange={(e) =>
                    handleInputChange(index, "passportNumber", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}

          <p style={{ fontSize: "25px", marginTop: "30px" }}>Booking Contact</p>

          <input
            id="email"
            type="email"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            id="phoneNumber"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <p style={{ fontSize: "25px", marginTop: "30px" }}>Payment Details</p>

          <input
            id="cardName"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter card name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
          <p style={{ fontWeight: "300", marginTop: "1%", color: "black" }}>
            Card types accepted: Visa, Mastercard
          </p>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
          >
            <img src={visa} alt="" style={{ width: "37px", height: "23px" }} />
            <img
              src={mastercard}
              alt=""
              style={{ width: "37px", height: "23px" }}
            />
          </div>
          <p
            style={{
              fontWeight: "300",
              marginTop: "1%",
              color: "black",
              fontSize: "15px",
            }}
          >
            Your card issuer may charge a fee.
          </p>
          <div
            style={{
              backgroundColor: "#C2C9CD",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <p style={{ padding: "20px", color: "black" }}>
              Card Information is fully encrypted and protected
            </p>
          </div>

          <input
            id="cardNumber"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <input
            id="cardExpirationDate"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter card expiration date"
            value={cardExpirationDate}
            onChange={(e) => setCardExpirationDate(e.target.value)}
            required
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              verticalAlign: "middle",
            }}
          >
            <input
              id="cvv"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "20%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter Security Code"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
            <img
              src={card}
              alt=""
              style={{ width: "90px", height: "36px", marginLeft: "4%" }}
            />
          </div>
          <input
            id="addressLine1"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter Address Line 1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
          <input
            id="addressLine2"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter Address line 2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            required
          />
          <input
            id="city"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            id="postalCode"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "44px",
              marginBottom: "20px",
              width: "100%",
              fontSize: "16px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            <option>Country</option>
            <option value="portugal">Portugal</option>
            <option value="spain">Spain</option>
            <option value="france">France</option>
            <option value="germany">Germany</option>
          </select>
          <button className="buttonSearchhotels" onClick={handleCheckout}>
            Book Now
          </button>
        </div>
        <div
          className="container1"
          style={{ paddingLeft: "30px", paddingTop: "20px" }}
        >
          <div style={{ backgroundColor: "#EFF1F2", borderRadius: "8px" }}>
            <HotelCard type="book" hotel={hotelData} />
          </div>
        </div>
      </div>
      <Footer />
      {showNotificationFlight && notificationFlight && (
        <div className="notification-popup">
          <h4 style={{ fontSize: "36px" }}>Flight Sale</h4>
          <p>{notificationMessage} €</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "7%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ textAlign: "start" }}>Origin:</p>
              <p
                style={{
                  marginLeft: "10%",
                  textAlign: "end",
                  fontWeight: "300",
                }}
              >
                {notificationFlight.airportOriginInfo.airportName}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ textAlign: "start" }}>Destination:</p>
              <p
                style={{
                  marginLeft: "10%",
                  textAlign: "end",
                  fontWeight: "300",
                }}
              >
                {notificationFlight.airportDestinationInfo.airportName}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ textAlign: "start" }}>Date:</p>
              <p style={{ textAlign: "end", fontWeight: "300" }}>
                {formatDate(notificationFlight.flightDate)}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ textAlign: "start" }}>Flight Number:</p>
              <p style={{ textAlign: "end", fontWeight: "300" }}>
                {notificationFlight.flightNumber}
              </p>
            </div>
          </div>
          <button onClick={() => setShowNotificationFlight(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelCheckout;
