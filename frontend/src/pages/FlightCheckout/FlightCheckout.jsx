import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./flightcheckout.css";
import {
  faInfoCircle,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import CardFlights from "../../components/cardFlights/CardFlights";
import visa from "../../components/images/visa.png";
import mastercard from "../../components/images/master-card.png";
import card from "../../components/images/card.png";
// Import other necessary components and hooks

const FlightCheckout = () => {
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

  const flight = {
    flightNumber: "AF0248",
    flightDate: "2023-12-13T00:00:00.000+00:00",
    airlineCode: "AF",
    airport_code_origin: "MAD",
    airport_code_destination: "ATL",
    departureHour: "2023-12-13 02:26",
    arrivalHour: "2023-12-13 11:09",
    duration: "8:42:27.554005",
    price: 915.25,
    seats: 270,
    airline_Code: { airlineCode: "AF", airlineName: "Air France" },
    airportcodeorigin: {
      airportCode: "MAD",
      airportName: "Adolfo SuÃ¡rez Madridâ€“Barajas Airport",
      airportLat: 40.4983,
      airportLong: -3.5676,
    },
    airportcodedestination: {
      airportCode: "ATL",
      airportName: "Hartsfield-Jackson Atlanta International Airport",
      airportLat: 33.749,
      airportLong: -84.388,
    },
  };

  const handleCheckout = () => {
    // Add logic for handling the checkout process
    console.log("Checkout logic goes here!");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const flightNumber = localStorage.getItem("flight");

  const handleGenderChange = (event) => {
    setSex(event.target.value);
  };

  //const [flight, setFlight] = useState("");

  // Function to fetch flight data
  // const fetchFlight = async () => {
  //     try {
  //         const response = await fetch(`http://localhost:8080/api/flightCheckout/${flightNumber}`);
  //         if (!response.ok) {
  //             throw new Error('Network response was not ok');
  //         }
  //         const data = await response.json();
  //         console.log('data');
  //         console.log(data);
  //         setFlight(data);
  //     } catch (error) {
  //         console.error('Fetch error:', error);
  //     }
  // };

  // useEffect to trigger API call on component mount
  // useEffect(() => {
  //     fetchFlight();
  // }, []);

  const [passengers, setPassengers] = useState([
    { firstName: "", lastName: "", gender: "", dob: "", passport: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        firstName: "",
        lastName: "",
        gender: "",
        nacionality: "",
        dob: "",
        passport: "",
      },
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) {
      alert("You must have at least one passenger");
      return;
    }
    const newPassengers = [...passengers];
    newPassengers.splice(index, 1);
    setPassengers(newPassengers);
  };

  return (
    <div>
      <Navbar />
      <div className="containerCheckout">
        <div className="container1">
          <p style={{ fontSize: "25px" }}>
            Passengers
            <FontAwesomeIcon
              style={{ marginLeft: "0.5%" }}
              icon={faInfoCircle}
            />
          </p>
          <p style={{ fontWeight: "300", marginTop: "1%", color: "black" }}>
            Please enter the information about the passengers
          </p>

          {passengers.map((passenger, index) => (
            <>
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
                  value={passenger.gender}
                  onChange={(e) =>
                    handleInputChange(index, "gender", e.target.value) &&
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
                  id="nacionality"
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
                  placeholder="Enter your nacionality"
                  value={passenger.nacionality}
                  onChange={(e) =>
                    handleInputChange(index, "nacionality", e.target.value)
                  }
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  id="dob"
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
                  value={passenger.dob}
                  onChange={(e) =>
                    handleInputChange(index, "dob", e.target.value)
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
                  value={passenger.passport}
                  onChange={(e) =>
                    handleInputChange(index, "passport", e.target.value)
                  }
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                  className="buttonSearchFlights"
                  onClick={addPassenger}
                  style={{ marginRight: "10px" }}
                >
                  Add More Passengers
                </button>
                <button
                  className="buttonSearchFlights"
                  style={{ backgroundColor: "red", marginLeft: "10px" }}
                  onClick={removePassenger}
                >
                  Delete Passenger
                </button>
              </div>
            </>
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
          <button className="buttonSearchFlights">Book Now</button>
        </div>
        <div className="container1">
          <h1>Flight CheckOut</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlightCheckout;