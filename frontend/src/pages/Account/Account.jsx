import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import FlightDetails from "../../components/flightDetails/FlightDetails";
import "./account.css";
import tap from "../../static/tap.png";
import newyork from "../../static/newyork.png";
import paris from "../../static/paris.png";

const Login = () => {
  const [name, setName] = useState("Roberto");
  const [surname, setSurname] = useState("Mourinho");
  const [email, setEmail] = useState("roberto@ua.pt");
  const [address, setAddress] = useState("Rua do Deti 5");
  const [postalCode, setPostalCode] = useState("3880-100");
  const [city, setCity] = useState("Aveiro");

  const [activeTab, setActiveTab] = useState("Flights");

  const handleClick = (tab) => {
    setActiveTab(tab); // Set the active tab to the one that was clicked
  };

  return (
    <div>
      <Navbar />
      <div class="loginheader">
        <div class="logintexttitle">Create an account</div>
      </div>

      <div className="infoContainer">
        <div className="infoContainer2">
          <input
            id="name"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "50px",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            value={name}
          />
          <input
            id="surname"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "50px",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            value={surname}
          />
          <input
            id="email"
            type="email"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "50px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            value={email}
          />
        </div>
        <div className="infoContainer2">
          <input
            id="address"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "50px",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            value={address}
          />
          <input
            id="postalCode"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "50px",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            value={postalCode}
          />

          <input
            id="city"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "50px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
            value={city}
          />
        </div>
      </div>
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
            <FlightDetails 
                destination="New York"
                outboundDate="Thu, Nov 24, 2023" 
                returnDate="Fri, Dec 1, 2023"
                airlineLogo={tap}
                outboundFlightInfo="14:00 OPO → 20:05 JFK"
                returnFlightInfo="22:00 JFK → 13:00+1 OPO"
                imageUrl={newyork}
                />
            <FlightDetails 
                destination="Paris" 
                outboundDate="Thu, Nov 24, 2023" 
                returnDate="Fri, Dec 1, 2023"
                airlineLogo={tap}
                outboundFlightInfo="14:00 OPO → 20:05 JFK"
                returnFlightInfo="22:00 JFK → 13:00+1 OPO"
                imageUrl={paris}
                />
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

export default Login;
