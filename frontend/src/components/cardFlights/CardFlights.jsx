import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardFlights.css";
import frame from "../images/Frame.png";
import layer1 from "../images/Layer_1.png";

const CardFlights = ({ flight }) => {
  const navigate = useNavigate();

  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight.id);
  };

  const handleBookFlight = (e, flight) => {
    e.stopPropagation();

    const userId = localStorage.getItem("userId");
  
    if (userId) {
      navigate("/AddExtrasFlight");
      localStorage.setItem("flight", flight["flightNumber"]);
    } else {
      alert("Please log in to book a flight.");
      navigate("/login");
    }
  };

  const isOneWay = localStorage.getItem("isOneWay");

  return (
    <div
      className={`flight-card ${selectedFlight === flight ? "selected" : ""}`}
    >
      <div className="flight-details">
        {isOneWay === "true" ? (
          <div className="flight-details1">
            <img
              src={`https://www.flightaware.com/images/airline_logos/90p/${flight["airline_Code"]["airlineICAO"]}.png`}
              className="airlineLogo"
              alt="Airline logo"
            />
            <div style={{ flex: 20, display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "1%",
                  marginRight: "2%",
                }}
              >
                <p className="text">{flight["departureHour"].split(" ")[1]}</p>
                <p className="text">{flight["airport_code_origin"]}</p>
              </div>
              <div className="div">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.5%",
                  }}
                >
                  <p className="text">{flight["flightNumber"]}</p>
                  <p className="text">
                    {flight["airline_Code"]["airlineName"]}
                  </p>
                  <p className="text">
                    {flight["duration"].split(":")[0] +
                      "H:" +
                      flight["duration"].split(":")[1] +
                      "M"}
                  </p>
                </div>
                <img className="svg-layer" alt="Svg layer" src={layer1} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "2%",
                }}
              >
                <p className="text">{flight["arrivalHour"].split(" ")[1]}</p>
                <p className="text">{flight["airport_code_destination"]}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flight-details1">
              <img
                src={`https://www.flightaware.com/images/airline_logos/90p/${flight["airline_Code"]["airlineICAO"]}.png`}
                className="airlineLogo"
                alt="Airline logo"
              />
              <div style={{ flex: 20, display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "1%",
                    marginRight: "2%",
                  }}
                >
                  <p className="text">
                    {flight["departureHour"].split(" ")[1]}
                  </p>
                  <p className="text">{flight["airport_code_origin"]}</p>
                </div>
                <div className="div">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "0.5%",
                    }}
                  >
                    <p className="text">{flight["flightNumber"]}</p>
                    <p className="text">
                      {flight["airline_Code"]["airlineName"]}
                    </p>
                    <p className="text">
                      {flight["duration"].split(":")[0] +
                        "H:" +
                        flight["duration"].split(":")[1] +
                        "M"}
                    </p>
                  </div>
                  <img className="svg-layer" alt="Svg layer" src={layer1} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "2%",
                  }}
                >
                  <p className="text">{flight["arrivalHour"].split(" ")[1]}</p>
                  <p className="text">{flight["airport_code_destination"]}</p>
                </div>
              </div>
            </div>
            <div className="flight-details1">
              <img
                src={`https://www.flightaware.com/images/airline_logos/90p/${flight["airline_Code"]["airlineICAO"]}.png`}
                className="airlineLogo"
                alt="Airline logo"
              />
              <div style={{ flex: 20, display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "1%",
                    marginRight: "2%",
                  }}
                >
                  <p className="text">
                    {flight["departureHour"].split(" ")[1]}
                  </p>
                  <p className="text">{flight["airport_code_origin"]}</p>
                </div>
                <div className="div">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "0.5%",
                    }}
                  >
                    <p className="text">{flight["flightNumber"]}</p>
                    <p className="text">
                      {flight["airline_Code"]["airlineName"]}
                    </p>
                    <p className="text">
                      {flight["duration"].split(":")[0] +
                        "H:" +
                        flight["duration"].split(":")[1] +
                        "M"}
                    </p>
                  </div>
                  <img className="svg-layer" alt="Svg layer" src={layer1} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "2%",
                  }}
                >
                  <p className="text">{flight["arrivalHour"].split(" ")[1]}</p>
                  <p className="text">{flight["airport_code_destination"]}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="Flightinfo">
        <div>{flight["price"]}€</div>
        <button
          className="buttonFlightSearch"
          onClick={(e) => handleBookFlight(e, flight)}
        >
          <div className="text-wrapper">Select</div>
          <img className="svg" alt="Svg" src={frame} />
        </button>
      </div>
    </div>
  );
};

export default CardFlights;
