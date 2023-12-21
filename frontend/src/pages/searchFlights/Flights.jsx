import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./flights.css"; // Import the CSS file
import CardFlights from "../../components/cardFlights/CardFlights";
import { useLocation } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const FlightBookingPage = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);

  const [stopsFilter, setStopsFilter] = useState("Any");
  const [departureTimeFilter, setDepartureTimeFilter] = useState("Any");
  const [durationFilter, setDurationFilter] = useState("Any");
  const [airlineFilter, setAirlineFilter] = useState("Any");

  const location = useLocation();
  const flightsData = location.state?.flightsData;
  const isRoundTrip = location.state?.isRoundTrip;
  const flightOptions = location.state?.flightOptions;
  const [notificationFlight, setNotificationFlight] = useState(null);
  const [showNotificationFlight, setShowNotificationFlight] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

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

  useEffect(() => {
    if (showNotificationFlight) {
      setTimeout(() => {
        setShowNotificationFlight(false);
      }, 7000);
    }
  }, [showNotificationFlight]);

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
      <div className="containerSearchFlight" style={{ alignItems: "start" }}>
        <div className="container2Flights">
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
        <div className="container3Flights">
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
                  isRoundTrip={isRoundTrip}
                  flightOptions={flightOptions}
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

export default FlightBookingPage;
