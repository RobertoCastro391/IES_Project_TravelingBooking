import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import './flights.css'; // Import the CSS file
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
  

const FlightBookingPage = () => {
 const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [stopsFilter, setStopsFilter] = useState("Any");
  const [departureTimeFilter, setDepartureTimeFilter] = useState("Any");
  const [durationFilter, setDurationFilter] = useState("Any");
  const [airlineFilter, setAirlineFilter] = useState("Any");

  const flightData = [
    { id: 1, airline: 'Ryanair', from:'Porto', To:'Prage', departure: '09:00 AM', arrival: '12:00 PM', price: 200, duration: '3 hours' },
    { id: 2, airline: 'Airline B',from:'Porto', To:'Prage',departure: '11:00 AM', arrival: '02:00 PM', price: 250, duration: '3 hours' },
    { id: 3, airline: 'Airline C',from:'Porto',To:'Prage', departure: '01:00 PM', arrival: '04:00 PM', price: 180, duration: '3 hours'},
    { id: 4, airline: 'Airline D',from:'Porto', To:'Prage',departure: '03:00 PM', arrival: '06:00 PM', price: 220, duration: '3 hours' },
    { id: 5, airline: 'Airline E',from:'Porto',To:'Prage', departure: '05:00 PM', arrival: '08:00 PM', price: 280, duration: '3 hours' },
    // Add more flight options as needed
  ];

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight.id);
  };

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

  const handleBookFlight = (e, flight) => {
    e.stopPropagation();
    alert(`You have booked flight ${flight.id}!`);
  };

 


  const filteredFlights = flightData.filter(
    (flight) => flight.price >= minPrice && flight.price <= maxPrice
  );

  return (
    <div>
      <Navbar />
      <Header/>
    <div className="flight-options-container">
    <div className="filters">
        {/* ... (previous filters) */}

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
          {/* Add more airline options as needed */}
        </select>
      
      <div className="flight-list">
        {filteredFlights.map((flight) => (
          <div
            key={flight.id}
            className={`flight-card ${selectedFlight === flight ? 'selected' : ''}`}
            onClick={() => handleSelectFlight(flight.id)}
          >
            <div className="flight-details">
              <strong class="FlightInfo">{flight.airline}</strong>
              <div class="Flightinfo">{flight.from}<div></div>{flight.To}</div>
              <div class="Flightinfo">Departure: {flight.departure} <FontAwesomeIcon icon={faPlaneDeparture}/> Arrival: {flight.arrival}</div>
              <div class="Flightinfo">Duration: 3 hours</div>
              <div>Price: ${flight.price}</div>
            </div>
            <button onClick={(e) => handleBookFlight(e, flight.id)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
};

export default FlightBookingPage;
