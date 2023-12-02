import React from "react";
import "./FlightDetails.css";

const FlightDetails = ({ destination, outboundDate, returnDate, airlineLogo, outboundFlightInfo, returnFlightInfo, imageUrl }) => {

    
    return (
      <div className="flightDetailsCard">
        <div className="flightDetailsHeader">
          <img src={airlineLogo} alt="Airline Logo" className="airlineLogo" />
          <div className="flightTimes">
            <div className="outbound">
              <span className="label">Outbound</span>
              <span>{outboundDate}</span>
              <span className="flightInfo">{outboundFlightInfo}</span>
            </div>
            <div className="return">
              <span className="label">Return</span>
              <span>{returnDate}</span>
              <span className="flightInfo">{returnFlightInfo}</span>
            </div>
          </div>
        </div>
        <div className="flightDetailsBody">
          <span className="destination">{destination}</span>
          <img src={imageUrl} alt={`${destination}`} className="destinationImage" />
        </div>
        <button className="detailsButton">See Details</button>
      </div>
    );
  };
  
export default FlightDetails;