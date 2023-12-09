import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./flights.css"; // Import the CSS file
import CardFlights from "../../components/cardFlights/CardFlights";
import { useLocation } from 'react-router-dom';

const FlightBookingPage = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);

  const [stopsFilter, setStopsFilter] = useState("Any");
  const [departureTimeFilter, setDepartureTimeFilter] = useState("Any");
  const [durationFilter, setDurationFilter] = useState("Any");
  const [airlineFilter, setAirlineFilter] = useState("Any");

  const location = useLocation();
  const flightsData = location.state?.flightsData;

  const handleSelectStops = (value) => {
    setStopsFilter(value);
  };

  const handleSelectDepartureTime = (value) => {
    setDepartureTimeFilter(value);
  };

  const handleSelectDuration = (value) => {
    setDurationFilter(value);
  };

  const handleSelectAirline = (value) => {
    setAirlineFilter(value);
  };

  return (
    <div>
      <Navbar />
      <Header type="flights" />
      <div className="containerSearch" style={{ alignItems: "start" }}>
        <div className="container2">
          <div className="filters">
            <label>Filter by Stops:</label>
            <select
              value={stopsFilter}
              onChange={(e) => handleSelectStops(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Direct">Direct</option>
              <option value="1 Stop">1 Stop</option>
              <option value="2+ Stops">2+ Stops</option>
            </select>

            <label>Filter by Departure Time:</label>
            <select
              value={departureTimeFilter}
              onChange={(e) => handleSelectDepartureTime(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>

            <label>Filter by Trip Duration:</label>
            <select
              value={durationFilter}
              onChange={(e) => handleSelectDuration(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Short">Short</option>
              <option value="Medium">Medium</option>
              <option value="Long">Long</option>
            </select>

            <label>Filter by Airline:</label>
            <select
              value={airlineFilter}
              onChange={(e) => handleSelectAirline(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Ryanair">Ryanair</option>
              <option value="Airline B">Airline B</option>
            </select>
          </div>
        </div>
        <div className="container3">
          {flightsData && flightsData["outboundFlights"].length > 0 ? (
            flightsData["outboundFlights"].map((outboundFlight, index) => {
              const returnFlight =
                flightsData["returnFlights"] &&
                flightsData["returnFlights"][index]
                  ? flightsData["returnFlights"][index]
                  : null;

              return (
                <CardFlights
                  outboundFlight={outboundFlight}
                  inboundFlight={returnFlight}
                  key={index}
                />
              );
            })
          ) : (
            <p>No flights available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlightBookingPage;
