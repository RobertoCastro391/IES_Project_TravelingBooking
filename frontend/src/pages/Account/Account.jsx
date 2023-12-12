import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import FlightDetails from "../../components/accountInfoTripsFlights/FlightDetails";
import AccountInfo from "../../components/accountInfo/AccountInfo";
import "./account.css";
import tap from "../../static/tap.png";
import newyork from "../../static/newyork.png";
import paris from "../../static/paris.png";
import { useEffect } from "react";


const Account = () => {

  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    postalCode: '',
    city: ''
  });

  const [userTrips, setUserTrips] = useState([]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Or however you're storing the user's ID
  
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
       
        console.log('data');
        console.log(data);
        
        setUserInfo({
          name: data.firstName,
          surname: data.lastName,
          email: data.email,
          address: data.streetAddress,
          postalCode: data.postalCode,
          city: data.city,
        });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    const fetchUserTrips = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/getReservationsByUser/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
    
        console.log('Fetched Data:');
        console.log(data);
    
        // Assuming data is an array of reservations
        const userTrips = data.map(trip => ({
          reservationID: trip.id,
          flightNumberOutbound: trip.flightNumberOutbound,
          flightNumberInbound: trip.flightNumberInbound,
          roundTrip: trip.roundTrip,
          totalPrice: trip.totalPrice,
          reservationDate: trip.reservationDate,
          passengers: trip.passengers
        }));
    
        setUserTrips(userTrips);
    
        console.log('User Trips after processing:');
        console.log(userTrips);
    
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
  
    if (userId) {
      fetchUserInfo();
      fetchUserTrips();
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
          <button className="button" onClick={() => handleClick("Packages")}>
            Packages
          </button>
        </div>

        
        {activeTab === "Flights" && (
          <div>
            {userTrips.map((reservationInfo, index) => (
              <FlightDetails
                key={index}
                reservationInfo={reservationInfo}
                imageUrl={paris}
              />
            ))}
          </div>
        )}
        {activeTab === "Trains" && (
          <div className="details">Page Under Devolpment</div>
        )}
        {activeTab === "Hotels" && (
          <div className="details">Page Under Devolpment</div>
        )}
        {activeTab === "Packages" && (
          <div className="details">Page Under Devolpment</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Account;
