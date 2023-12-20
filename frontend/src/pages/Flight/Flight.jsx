import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import CardFlights from "../../components/cardFlights/CardFlights";
import "./flight.css";

const Flights = () => {
  const [flightsData, setFlightsData] = useState([]);

  useEffect(() => {
    const fetchUserFlights = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/flights`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('Fetched Data Flights:');
        console.log(data);

        // Select random flights
        setFlightsData(selectRandomFlights(data, 10));

      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    fetchUserFlights();
  }, []);

  // Function to select random flights
  const selectRandomFlights = (flights, number) => {
    return flights.sort(() => 0.5 - Math.random()).slice(0, number);
  };

  return (
    <div>
      <Navbar />
      <Header type={"flights"} />

      <div className="flightsContainer">
        <h1 className="flightsTitle">Discover unique places</h1>
        <div className="containerFlight">
          {flightsData.length > 0 ? (
            flightsData.map((outboundFlight, index) => {
              return (
                <CardFlights
                  outboundFlight={outboundFlight}
                  inboundFlight={null}
                  isRoundTrip={null}
                  flightOptions={null}
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

export default Flights;
