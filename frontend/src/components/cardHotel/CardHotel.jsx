import React from "react";
import {
  fahotel
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faStar, faSnowflake, faPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardHotel.css";
import frame from "../images/Frame.png";

const Cardhotels = ({type = "details"} ) => {
  const navigate = useNavigate();

  const [selectedhotel, setSelectedhotel] = useState(null);

  // const handleSelecthotel = (hotel) => {
  //   setSelectedhotel(hotel.id);
  // };

  // const handleBookhotel = (e, hotel) => {
  //   e.stopPropagation();
  //   navigate("/hotelcheckout");
  //   localStorage.setItem("hotel", hotel['hotelNumber']);
  //   alert(You have booked hotel ${hotel['hotelNumber']}!);
  // };

  return (
    <div className="hotel-card">
      <div className="hotel-details">
        <div className="hotelDetails1">
          {/* <img
            src={https://www.flightaware.com/images/airline_logos/90p/${hotel["airline_Code"]["airlineICAO"]}.png}
            className="airlineLogo"
            alt="Airline logo"
          /> */}
          <div style={{marginBottom: "10px"}}>
            <div >
              <h1 className="hotelTitle">The Manhattan at Times Square Hotel</h1>
              <h7 className="hotelAddress">790 7th Ave, New York, NY 10019 • +1 212-581-3300</h7>
            </div> 
            <div style={{flexDirection:"column"}}>
              <div style={{flexDirection:"row"}}>
                <div className="square">
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  <p className="info" style={{marginLeft: "5px"}}>2</p>
                </div>      

                <div className="square" style={{marginLeft: "10px"}}>
                  <FontAwesomeIcon icon={faLock} className="icon" />
                  <p className="info" style={{marginLeft: "5px"}}>2</p>
                </div> 
              </div> 
            </div>  
            <div style={{flexDirection:"column"}}>
              <div style={{flexDirection:"row"}}>
                <div className="square">
                  <FontAwesomeIcon icon={faStar} className="icon" />
                  <p className="info" style={{marginLeft: "5px"}}>3.2</p>
                </div>      

                <div className="square" style={{marginLeft: "10px"}}>
                  <p className="info" >BREAKFAST</p>
                </div> 
              </div> 
            </div> 
            <div style={{flexDirection:"column"}}>
              <div style={{flexDirection:"row"}}>
                <div className="square">
                  <FontAwesomeIcon icon={faSnowflake} className="icon" />
                  <p className="info" style={{marginLeft: "5px"}}>AC</p>
                </div>      

                <div className="square" style={{marginLeft: "10px"}}>
                  <p className="info" >WIFI</p>
                </div> 
              </div> 
            </div>  
            <div style={{marginTop:"20px", display: "inline-flex"}} >
              <FontAwesomeIcon icon={faPlane} className="icon" />
              <p className="info" style={{marginLeft: "5px"}}>Pickup: Shuttle bus (EWR)</p></div>         
          </div>
        </div>
      </div>
      <div className="hotelinfo">
        <div>
          <h5>FROM</h5>
        </div>
        <div>
          <h1>€120</h1>
        </div>
        <div style={{ display:"flex",justifyContent:"center"}}>
          {type==="details" &&
                  <button className="buttonhotelSearch" onClick={() => navigate("/hotelDetails")}>View Details</button>
          }
            {type==="checkout" &&
                  <button className="buttonhotelSearch" onClick={() => navigate("/hotelDetails")}>Checkout</button>
          }
          
        </div>
      </div>
    </div>
  );
};

export default Cardhotels;