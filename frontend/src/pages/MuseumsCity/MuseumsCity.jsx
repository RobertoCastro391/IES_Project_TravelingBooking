import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./museumscity.css";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardMuseumCity from "../../components/cardMuseumCity/CardMuseumCity";
import pic1 from "../../static/museums/1.jpg";
import pic2 from "../../static/museums/12.jpg";
import pic3 from "../../static/museums/13.jpg";
import pic4 from "../../static/museums/14.jpg";
import pic5 from "../../static/museums/15.jpg";
import pic6 from "../../static/museums/16.jpg";
import pic7 from "../../static/museums/17.jpg";

const MuseumsCity = () => {
  const location = useLocation();
  const museums = location.state?.museums;
  const city = location.state?.city;
  const [notificationFlight, setNotificationFlight] = useState(null);
  const [showNotificationFlight, setShowNotificationFlight] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  console.log("city");
  console.log(museums);

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

  const navigate = useNavigate();

  const cardsPerRow = 3;

  // Create an array of arrays, each containing three cards
  const rows = [];
  for (let i = 0; i < museums.length; i += cardsPerRow) {
    rows.push(museums.slice(i, i + cardsPerRow));
  }

  const allImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7];

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const selectRandomImages = () => {
      let shuffled = allImages
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setSelectedImages(shuffled);
    };

    selectRandomImages();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="museums" />

      <div className="museumsCityContainer">
        <h1 className="museumsCityTitle">
          Explore this in: <i>{city}</i>
        </h1>
        {rows.map((row, rowIndex) => (
          <div className="museumsCityFeatured" key={rowIndex}>
            {row.map((museum, cardIndex) => (
              <CardMuseumCity
                key={cardIndex}
                imageUrl={selectedImages[rowIndex * cardsPerRow + cardIndex]}
                museum={museum}
              />
            ))}
          </div>
        ))}
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

export default MuseumsCity;
