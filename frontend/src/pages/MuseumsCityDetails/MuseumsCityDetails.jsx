import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./museumcitydetails.css";
import react, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const MuseumsCityDetails = () => {
  const location = useLocation();
  const museum = location.state?.museum;
  const [notificationFlight, setNotificationFlight] = useState(null);
  const [showNotificationFlight, setShowNotificationFlight] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const imageUrl = location.state?.imageUrl;

  const coordinates = [museum.museumLatitude, museum.museumLongitude];

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

  return (
    <div>
      <Navbar />
      <Header type="museums" />

      <div className="museumsCityDetailsContainer">
        <h1 className="museumsCityDetailsTitle">
          {museum.museumLocation}: <i>{museum.museumName}</i>
        </h1>
        <div className="museumsCityDetailsFeatured">
          <div className="museumCityDetailsCard">
            <img
              class="musuemCityDetailsCardImg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS5Ibsjk-vwVvrODRHQO-Zf5D0G3NJlb754Q&usqp=CAU"
              alt=""
            />
          </div>
          <div className="museumCityDetailsCard2">
            <h1 className="cityDescriptionTitle">What to expect?</h1>
            <p className="cityDescription">
              {museum.museumDescription}
              <a style={{ color: "grey" }}>
                {" "}
                (Check the latest information on the official website to plan
                your visit accurately.)
              </a>
            </p>
          </div>
        </div>
        <h2 className="museumsCityDetailsTitle">Pratical Information</h2>
        <div className="museumsCityDetailsFeatured">
          <div className="museumCityDetailsCard2">
            <h2>Opening hours:</h2>
            <div className="museumCityDetailsInfo">
              <p>Monday: {museum.openingHours}</p>
              <p>Tuesday: {museum.openingHours}</p>
              <p>Wednesday: {museum.openingHours}</p>
              <p>Thursday: {museum.openingHours}</p>
              <p>Friday: {museum.openingHours}</p>
              <p>Saturday: {museum.openingHours}</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="museumCityDetailsCard2">
            <h2>Ticket Prices:</h2>
            <div className="museumCityDetailsInfo">
              <p>Adult: {museum.ticketPriceAdult}€</p>
              <p>Children up to 15 years: {museum.ticketPriceChild}€</p>
              <p>Adult Group: {museum.ticketPriceGroup}€ </p>
              <p>Child Group: {museum.ticketPriceGroupChild}€</p>
            </div>
          </div>
        </div>
        <h2 className="museumsCityDetailsTitle">Location:</h2>
        <div className="museumsCityDetailsFeatured">
          <div className="museumCityDetailsCard2">
            <div className="museumCityDetailsInfo2">
              <MapContainer
                center={coordinates}
                zoom={10}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={coordinates}>
                  <Popup>
                    {museum.museumName}, {museum.museumLocation}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
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

export default MuseumsCityDetails;
