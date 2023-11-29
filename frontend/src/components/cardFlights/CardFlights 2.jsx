import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./cardFlights.css";

const CardFlights = ({ flight }) => {

  const [selectedFlight, setSelectedFlight] = useState(null);
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight.id);
  };

  const handleBookFlight = (e, flight) => {
    e.stopPropagation();
    alert(`You have booked flight ${flight.id}!`);
  };

  return (
    <div
      key={flight.id}
      className={`flight-card ${selectedFlight === flight ? "selected" : ""}`}
      onClick={() => handleSelectFlight(flight.id)}
    >
      <div className="flight-details">
        <strong
          class="FlightInfo"
          style={{ textAlign: "center", marginLeft: "31px" }}
        >
          {flight.airline}
        </strong>
        <div class="Flightinfo">
          {flight.from}
          <div></div>
          {flight.To}
        </div>
        <div class="Flightinfo">
          Departure: {flight.departure}{" "}
          <FontAwesomeIcon icon={faPlaneDeparture} /> Arrival: {flight.arrival}
        </div>
        <div class="Flightinfo">Duration: 3 hours</div>
      </div>
      <button onClick={(e) => handleBookFlight(e, flight.id)}>
        <div>Price: ${flight.price}</div>
        Book Now
      </button>
    </div>
  );
};

export default CardFlights;