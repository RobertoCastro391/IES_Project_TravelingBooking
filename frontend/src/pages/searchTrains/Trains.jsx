import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./trains.css"; // Import the CSS file
import CardTrains from "../../components/cardTrains/CardTrains";

const TrainBookingPage = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);

  const [stopsFilter, setStopsFilter] = useState("Any");
  const [departureTimeFilter, setDepartureTimeFilter] = useState("Any");
  const [durationFilter, setDurationFilter] = useState("Any");
  const [airlineFilter, setAirlineFilter] = useState("Any");

  const [trainData, setTrains] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/trains");
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data");
        console.log(data);
        setTrains(data); // Update the airports state with the fetched data
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };
    fetchData();
  }, []);

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
              onChange={(e) => handleSelectAirline(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Orient Express">Orient Express</option>
              <option value="SJ">SJ (Statens Järnvägar)</option>
              <option value="Eurostar">Eurostar</option>
            </select>
          </div>
        </div>
        <div className="container3">
          <CardTrains/>
          {/* {trainData && trainData.length > 0 ? (
            trainData.map((train) => (
              <CardTrains train={train}/>
            ))
          ) : (
            <p>No trains available</p>
          )} */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrainBookingPage;
