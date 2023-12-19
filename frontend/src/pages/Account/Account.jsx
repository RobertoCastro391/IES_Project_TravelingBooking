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
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Or however you're storing the user's ID
    const token = localStorage.getItem("token");
    
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/userinfo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
    
        console.log('data');
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
        console.error('Failed to fetch user info:', error);
      }
    };

    const fetchUserFlights = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/getReservationsByUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
    
        console.log('Fetched Data Flights:');
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
        console.error('Failed to fetch user info:', error);
      }
    };

    const fetchUserTrains = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trains/getReservationsByUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hotels/getReservationsByUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
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
              <HotelDetails
                key={index}
                reservationInfo={reservationInfo}
              />
            ))}
          </div>
        )}
       
      </div>

      <Footer />
    </div>
  );
};

export default Account;
