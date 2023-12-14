import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./flightcheckout.css";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import visa from "../../components/images/visa.png";
import mastercard from "../../components/images/master-card.png";
import card from "../../components/images/card.png";
import cancelation from "../../components/images/cancelation.png";
import { useNavigate } from "react-router-dom";
import CardFlightCheckout from "../../components/cardFlightCheckout/CardFlightCheckout";

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
  const [priceFlight, setPriceFlight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [optionalPrice, setOptionalPrice] = useState(0);
  const isOneWay = localStorage.getItem("isOneWay");
  const flightOptions = JSON.parse(localStorage.getItem("flightOptions"));
  const flightNumberOutbound = localStorage.getItem("flightOutbound");
  const flightNumberInbound = localStorage.getItem("flightInbound");
  const [outboundFlight, setOutboundFlight] = useState(null);
  const [inboundFlight, setInboundFlight] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (flightNumber, setFlightFunc) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/flights/flightCheckout/${flightNumber}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFlightFunc(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };
    if (flightNumberOutbound) {
      fetchData(flightNumberOutbound, setOutboundFlight);
    }

    if (isOneWay === "false" && flightNumberInbound) {
      fetchData(flightNumberInbound, setInboundFlight);
    }
  }, [flightNumberOutbound, flightNumberInbound, isOneWay]);

  useEffect(() => {
    if (
      outboundFlight &&
      outboundFlight["price"] &&
      flightOptions &&
      flightOptions.adult !== undefined &&
      flightOptions.children !== undefined
    ) {
      let price = parseFloat(
        (
          flightOptions.adult * outboundFlight["price"] +
          (flightOptions.children * outboundFlight["price"]) / 2
        ).toFixed(2)
      );

      if (isOneWay === "false") {
        price += parseFloat(
          (
            flightOptions.adult * inboundFlight["price"] +
            (flightOptions.children * inboundFlight["price"]) / 2
          ).toFixed(2)
        );
        setOptionalPrice(
          parseFloat(
            ((outboundFlight["price"] + inboundFlight["price"]) / 3).toFixed(2)
          )
        );
      } else {
        setOptionalPrice(parseFloat((outboundFlight["price"] / 3).toFixed(2)));
      }

      setPriceFlight(price);
      const priceTotal = parseFloat((price + optionalPrice).toFixed(2));
      setTotalPrice(priceTotal);
    }
  }, [outboundFlight, flightOptions, isOneWay, inboundFlight, optionalPrice]);

  useEffect(() => {
    if (flightOptions) {
      const adultPassengers = Array.from(
        { length: flightOptions.adult },
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
        { length: flightOptions.children },
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
  }, [flightOptions.adult,flightOptions.children]);

  const handleCheckout = async () => {
    const reservationData = {
      userID: parseInt(localStorage.getItem("userId")),
      flightNumberOutbound: flightNumberOutbound,
      flightNumberInbound: flightNumberInbound === "null" ? null : flightNumberInbound,
      isRoundTrip: isOneWay === "true" ? false : true,
      totalPrice: totalPrice,
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
      countryCard: country
    };

    console.log("Reservation data:", reservationData);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/createReservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Reservation successful:", responseData);
      alert(`You have successfully booked your flight!\nYour confirmation conde is ${responseData.reservationId}\nThank you for choosing TravellingBooking by IES!`);
      navigate("/"); // Redirect to home or confirmation page
    } catch (error) {
      console.error("Error in making reservation:", error.Error);
      alert("Failed to book the flight. Please try again.");
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
      <Header type="addExtrasFLight" />
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
          <button className="buttonSearchFlights" onClick={handleCheckout}>
            Book Now
          </button>
        </div>
        <div
          className="container1"
          style={{ paddingLeft: "30px", paddingTop: "20px" }}
        >
          <div style={{ backgroundColor: "#EFF1F2", borderRadius: "8px" }}>
            <div
              style={{
                padding: "20px",
                margin: "20px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <p>Flight Details</p>
              <div>
                {isOneWay === "true" ? (
                  <div>
                    {outboundFlight && outboundFlight["airline_Code"] ? (
                      <CardFlightCheckout flight={outboundFlight} />
                    ) : (
                      "Loading..."
                    )}
                  </div>
                ) : (
                  <div>
                    {outboundFlight && outboundFlight["airline_Code"] ? (
                      <CardFlightCheckout flight={outboundFlight} />
                    ) : (
                      "Loading..."
                    )}
                    {inboundFlight && inboundFlight["airline_Code"] ? (
                      <CardFlightCheckout flight={inboundFlight} />
                    ) : (
                      "Loading..."
                    )}
                  </div>
                )}
              </div>
              {isOneWay === "false" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "2%",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <FlightDetails flight={outboundFlight} />
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <FlightDetails flight={inboundFlight} type="Inbound" />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FlightDetails flight={outboundFlight} />
                </div>
              )}
            </div>
            <div
              style={{
                padding: "20px",
                margin: "20px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>Flight:</p>

                {outboundFlight ? (
                  <div>
                    <div style={{ marginTop: "10px" }}>
                      <p style={{ color: "black", fontSize: "18px" }}>
                        Adults: {flightOptions.adult}
                      </p>
                      <p style={{ color: "black", fontSize: "18px" }}>
                        Children: {flightOptions.children}
                      </p>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <p style={{ color: "black", fontSize: "18px" }}>
                        Total Price: {priceFlight} €
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>Loading ...</p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <p>Additional Options:</p>
                {outboundFlight && outboundFlight["price"] ? (
                  <p style={{ color: "black" }}>{optionalPrice}€</p>
                ) : (
                  <p>Loading ...</p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  borderTop: "1px solid black",
                }}
              >
                <p style={{ marginTop: "10px" }}>Total</p>
                {outboundFlight && outboundFlight["price"] ? (
                  <p style={{ marginTop: "10px" }}>{totalPrice}€</p>
                ) : (
                  <p>Loading ...</p>
                )}
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                margin: "20px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                <img
                  src={cancelation}
                  style={{ width: "24px", height: "24px" }}
                  alt="cancelationIcon"
                />
                <p
                  style={{
                    color: "black",
                    marginLeft: "15px",
                    marginTop: "-3px",
                  }}
                >
                  Free cancellation
                </p>
              </div>
              {/* {outboundFlight["flightDate"] ? (
                <p
                  style={{
                    marginTop: "10px",
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Free cancellation before 11:59 PM on{" "}
                  {(() => {
                    const flightDate = new Date(outboundFlight["flightDate"]);
                    flightDate.setDate(flightDate.getDate() - 1); // Subtract one day
                    return flightDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
                  })()}{" "}
                  (local time of hotel). After that, you'll be charged 100% of
                  the cost.
                </p>
              ) : (
                <p>Loading...</p>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlightCheckout;

const FlightDetails = ({ flight, type = "Outbound" }) => {
  return (
    <div style={{ paddingLeft: "4%" }}>
      {flight ? (
        <div>
          <p>{type}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <p style={{ color: "black", fontSize: "18px" }}>Flight Number:</p>
            <p
              style={{
                color: "black",
                fontSize: "18px",
                marginLeft: "10px",
              }}
            >
              {" "}
              {flight["flightNumber"]}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <p style={{ color: "black", fontSize: "18px" }}>Date:</p>
            {flight && flight["flightDate"] ? (
              <p
                style={{
                  color: "black",
                  fontSize: "18px",
                  marginLeft: "10px",
                }}
              >
                {flight["flightDate"].split("T")[0]}
              </p>
            ) : (
              <p>Loading ...</p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <p style={{ color: "black", fontSize: "18px" }}>Departure Time:</p>
            {flight && flight["departureHour"] ? (
              <p
                style={{
                  color: "black",
                  fontSize: "18px",
                  marginLeft: "10px",
                }}
              >
                {flight["departureHour"].split(" ")[1]}
              </p>
            ) : (
              <p>Loading ...</p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <p style={{ color: "black", fontSize: "18px" }}>Arrival Time:</p>
            {flight && flight["arrivalHour"] ? (
              <p
                style={{
                  color: "black",
                  fontSize: "18px",
                  marginLeft: "10px",
                }}
              >
                {flight["arrivalHour"].split(" ")[1]}
              </p>
            ) : (
              <p>Loading ...</p>
            )}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};
