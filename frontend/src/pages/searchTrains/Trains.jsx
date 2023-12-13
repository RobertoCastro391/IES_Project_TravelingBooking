import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./trains.css"; // Import the CSS file
import CardTrains from "../../components/cardTrains/CardTrains";
import { useLocation } from 'react-router-dom';

const TrainBookingPage = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);

  const [stopsFilter, setStopsFilter] = useState("Any");
  const [departureTimeFilter, setDepartureTimeFilter] = useState("Any");
  const [durationFilter, setDurationFilter] = useState("Any");
  const [airlineFilter, setTrainCompanyFilter] = useState("Any");

  const location = useLocation();
  const trainData = location.state?.trainsData;

  const handleSelectStops = (value) => {
    setStopsFilter(value);
  };

  const handleSelectDepartureTime = (value) => {
    setDepartureTimeFilter(value);
  };

  const handleSelectDuration = (value) => {
    setDurationFilter(value);
  };

  const handleSelectTrainCompany = (value) => {
    setTrainCompanyFilter(value);
  };

  
  return (
    <div>
      <Navbar />
      <Header type='trains' />
      <div className="containerSearch" style={{alignItems: 'start'}}>
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

            <label>Filter by Train Company:</label>
            <select
              value={airlineFilter}
              onChange={(e) => handleSelectTrainCompany(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Orient Express">Orient Express</option>
              <option value="SJ">SJ (Statens Järnvägar)</option>
              <option value="Eurostar">Eurostar</option>
            </select>
          </div>
        </div>
        <div className="container3">
          {trainData["outboundTrains"] && trainData["outboundTrains"].length > 0 ? (
            trainData["outboundTrains"].map((train) => (
              <CardTrains outboundTrain={train}/>
            ))
          ) : (
            <p>No trains available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrainBookingPage;
