import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./payment.css"; // Import the CSS file
import { faUser, faEnvelope, faLock, faIdCard, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import CardFlights from "../../components/cardFlights/CardFlights";

const FlightBookingPage = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [bag, setbag] = useState("");

  const flightData = [
    {
      id: 1,
      airline: "Ryanair",
      from: "Porto",
      to: "Prague",
      departure: "09:00 AM",
      arrival: "12:00 PM",
      price: 200,
      duration: "3 hours",
    },
  ];

  const filteredFlights = flightData.filter(
    (flight) => flight.price >= minPrice && flight.price <= maxPrice
  );

  const handleCheckout = () => {
    // Add logic for handling the checkout process
    console.log("Checkout logic goes here!");
  };

  return (
    <div>
      <Navbar />
      <div className="checkout-container">
        {/* User Information Section */}
        <div className="info-container">
          <div className="info-container-1">
            <label className="register-label">Name:</label>
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              className="register-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            <label className="register-label">Surname:</label>
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              className="register-input"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Enter your surname"
            />

            <label className="register-label">Credit Card Number:</label>
            <FontAwesomeIcon icon={faIdCard} />
            <input
              type="text"
              className="register-input"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter your credit card number"
            />

            <label className="register-label">CVV:</label>
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              className="register-input"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="Enter your CVV"
            />

            <label className="register-label">Number of Bags:</label>
            <FontAwesomeIcon icon={faBagShopping} />
            <input
              type="bag"
              className="register-input"
              value={bag}
              onChange={(e) => setbag(e.target.value)}
              placeholder="Enter number of bags"
            />
          </div>
        </div>

        {/* Flight Selection Section */}
        <div className="container-search">
          <div className="container-3">
            {filteredFlights.map((flight) => (
              <CardFlights key={flight.id} flight={flight} />
            ))}
          </div>

          {/* Checkout Button */}
          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FlightBookingPage;
