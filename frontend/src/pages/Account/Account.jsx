import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import FlightDetails from "../../components/accountInfoTripsFlights/FlightDetails";
import TrainDetails from "../../components/accountInfoTripsTrains/TrainDetails";
import HotelDetails from "../../components/accountInfoTripsHotel/HotelDetails";
import AccountInfo from "../../components/accountInfo/AccountInfo";
import "./account.css";
import tap from "../../static/tap.png";
import newyork from "../../static/newyork.png";
import paris from "../../static/paris.png";
import { useEffect } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
  });

  const [userFlights, setUserFlights] = useState([]);
  const [userHotels, setUserHotels] = useState([]);
  const [userTrains, setUserTrains] = useState([]);
  const [notificationFlight, setNotificationFlight] = useState(null);
  const [showNotificationFlight, setShowNotificationFlight] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Or however you're storing the user's ID
    const token = localStorage.getItem("token");

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/userinfo`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("data");
        console.log(data);

        setUserInfo({
          name: data.name,
          surname: data.surname,
          email: data.email,
          address: data.address,
          postalCode: data.postalCode,
          city: data.city,
        });
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    const fetchUserFlights = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/flights/getReservationsByUser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("Fetched Data Flights:");
        console.log(data);

        // Assuming data is an array of reservations
        const userFlights = data.map((trip) => ({
          reservationID: trip.id,
          flightNumberOutbound: trip.flightNumberOutbound,
          flightNumberInbound: trip.flightNumberInbound,
          roundTrip: trip.roundTrip,
          totalPrice: trip.totalPrice,
          reservationDate: trip.reservationDate,
          passengers: trip.passengers,
        }));

        setUserFlights(userFlights);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    const fetchUserTrains = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/trains/getReservationsByUser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("Fetched Data Trains:");
        console.log(data);

        // Assuming data is an array of reservations
        const userTrains = data.map((trip) => ({
          reservationID: trip.id,
          trainNumberOutbound: trip.trainNumberOutbound,
          trainNumberInbound: trip.trainNumberInbound,
          roundTrip: trip.roundTrip,
          totalPrice: trip.totalPrice,
          reservationDate: trip.reservationDate,
          passengers: trip.passengers,
        }));

        setUserTrains(userTrains);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    const fetchUserHotels = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/hotels/getReservationsByUser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("Fetched Data Hotels:");
        console.log(data);

        // Assuming data is an array of reservations
        const userHotels = data.map((trip) => ({
          reservationID: trip.id,
          hotel: trip.hotel,
          totalPrice: trip.totalPrice,
          reservationDate: trip.reservationDate,
          passengers: trip.passengers,
        }));

        setUserHotels(userHotels);

        console.log("User Trips after processing:");
        console.log(userHotels);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (userId) {
      fetchUserInfo();
      fetchUserFlights();
      fetchUserTrains();
      fetchUserHotels();
    }
  }, []);

  const [activeTab, setActiveTab] = useState("Flights");

  const handleClick = (tab) => {
    setActiveTab(tab); // Set the active tab to the one that was clicked
  };

  return (
    <div>
      <Navbar />
      <div class="loginheader">
        <div class="logintexttitle">Your account information</div>
      </div>
      <AccountInfo
        name={userInfo.name}
        surname={userInfo.surname}
        email={userInfo.email}
        address={userInfo.address}
        postalCode={userInfo.postalCode}
        city={userInfo.city}
      />

      <div class="loginheader">
        <div class="logintexttitle">Your trips information</div>
      </div>

      <div className="infoTripsContainer">
        <div className="infoTripsContainer2">
          <button className="button" onClick={() => handleClick("Flights")}>
            Flights
          </button>
          <button className="button" onClick={() => handleClick("Trains")}>
            Trains
          </button>
          <button className="button" onClick={() => handleClick("Hotels")}>
            Hotels
          </button>
        </div>

        {activeTab === "Flights" && (
          <div>
            {userFlights.length === 0 && (
              <div className="noTrips">
                <div className="noTripsText">
                  You have no trips yet, book your next trip now!
                </div>
              </div>
            )}
            {userFlights.map((reservationInfo, index) => (
              <FlightDetails
                key={index}
                reservationInfo={reservationInfo}
                imageUrl={paris}
              />
            ))}
          </div>
        )}
        {activeTab === "Trains" && (
          <div>
            {userTrains.length === 0 && (
              <div className="noTrips">
                <div className="noTripsText">
                  You have no trips yet, book your next trip now!
                </div>
              </div>
            )}
            {userTrains.map((reservationInfo, index) => (
              <TrainDetails
                key={index}
                reservationInfo={reservationInfo}
                imageUrl={paris}
              />
            ))}
          </div>
        )}
        {activeTab === "Hotels" && (
          <div>
            {userHotels.length === 0 && (
              <div className="noTrips">
                <div className="noTripsText">
                  You have no trips yet, book your next trip now!
                </div>
              </div>
            )}
            {userHotels.map((reservationInfo, index) => (
              <HotelDetails key={index} reservationInfo={reservationInfo} />
            ))}
          </div>
        )}
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

export default Account;
