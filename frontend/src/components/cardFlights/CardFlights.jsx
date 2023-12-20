import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardFlights.css";
import frame from "../images/Frame.png";
import layer1 from "../images/Layer_1.png";

const CardFlights = ({ outboundFlight, inboundFlight = null, isRoundTrip, flightOptions, select = true }) => {
  const navigate = useNavigate();

  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight.id);
  };

  const handleBookFlight = (e, flightOutbound, flightInbound = null) => {
    e.stopPropagation();

    const userId = localStorage.getItem("userId");
  
    if (userId) {
      navigate("/AddExtrasFlight", { state: {isRoundTrip: isRoundTrip,flightOptions: flightOptions}});
      localStorage.setItem("flightOutbound", flightOutbound["flightNumber"]);
      if (flightInbound !== null) {
        localStorage.setItem("flightInbound", flightInbound["flightNumber"]);
      }
      else {
        localStorage.setItem("flightInbound", null);
      }
    
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`flight-card ${
        selectedFlight === outboundFlight ? "selected" : ""
      }`}
    >
      <div className="flight-details">
        {inboundFlight === null ? (
          <div className="flight-details1">
            <img
              src={`https://www.flightaware.com/images/airline_logos/90p/${outboundFlight["airline_Code"]["airlineICAO"]}.png`}
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
                  {outboundFlight["departureHour"].split(" ")[1]}
                </p>
                <p className="text">{outboundFlight["airportCodeOrigin"]}</p>
              </div>
              <div className="div">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.5%",
                  }}
                >
                  <p className="text">{outboundFlight["flightNumber"]}</p>
                  <p className="text">
                    {outboundFlight["airline_Code"]["airlineName"]}
                  </p>
                  <p className="text">
                    {outboundFlight["duration"].split(":")[0] +
                      "H:" +
                      outboundFlight["duration"].split(":")[1] +
                      "M"}
                  </p>
                </div>
                <img
                  className="svg-layer-flights"
                  alt="Svg layer"
                  src={layer1}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "2%",
                }}
              >
                <p className="text">
                  {outboundFlight["arrivalHour"].split(" ")[1]}
                </p>
                <p className="text">
                  {outboundFlight["airportCodeDestination"]}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flight-details1">
              <img
                src={`https://www.flightaware.com/images/airline_logos/90p/${outboundFlight["airline_Code"]["airlineICAO"]}.png`}
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
                    {outboundFlight["departureHour"].split(" ")[1]}
                  </p>
                  <p className="text">{outboundFlight["airportCodeOrigin"]}</p>
                </div>
                <div className="div">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "0.5%",
                    }}
                  >
                    <p className="text">{outboundFlight["flightNumber"]}</p>
                    <p className="text">
                      {outboundFlight["airline_Code"]["airlineName"]}
                    </p>
                    <p className="text">
                      {outboundFlight["duration"].split(":")[0] +
                        "H:" +
                        outboundFlight["duration"].split(":")[1] +
                        "M"}
                    </p>
                  </div>
                  <img
                    className="svg-layer-flights"
                    alt="Svg layer"
                    src={layer1}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "2%",
                  }}
                >
                  <p className="text">
                    {outboundFlight["arrivalHour"].split(" ")[1]}
                  </p>
                  <p className="text">
                    {outboundFlight["airportCodeDestination"]}
                  </p>
                </div>
              </div>
            </div>
            <div className="flight-details1">
              <img
                src={`https://www.flightaware.com/images/airline_logos/90p/${inboundFlight["airline_Code"]["airlineICAO"]}.png`}
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
                    {inboundFlight["departureHour"].split(" ")[1]}
                  </p>
                  <p className="text">{inboundFlight["airportCodeOrigin"]}</p>
                </div>
                <div className="div">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "0.5%",
                    }}
                  >
                    <p className="text">{inboundFlight["flightNumber"]}</p>
                    <p className="text">
                      {inboundFlight["airline_Code"]["airlineName"]}
                    </p>
                    <p className="text">
                      {inboundFlight["duration"].split(":")[0] +
                        "H:" +
                        inboundFlight["duration"].split(":")[1] +
                        "M"}
                    </p>
                  </div>
                  <img
                    className="svg-layer-flights"
                    alt="Svg layer"
                    src={layer1}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "2%",
                  }}
                >
                  <p className="text">
                    {inboundFlight["arrivalHour"].split(" ")[1]}
                  </p>
                  <p className="text">
                    {inboundFlight["airportCodeDestination"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="Flightinfo">
        <div>
          {inboundFlight === null ? (
            <span>{parseFloat(outboundFlight["price"].toFixed(2))}€</span>
          ) : (
            <span>
              {parseFloat(
                (outboundFlight["price"] + inboundFlight["price"]).toFixed(2)
              )}
              €
            </span>
          )}
        </div>

        {select == true && (
          <button
            className="buttonFlightSearch"
            onClick={(e) => handleBookFlight(e, outboundFlight, inboundFlight)}
          >
            <div className="text-wrapper">Select</div>
            <img className="svg" alt="Svg" src={frame} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CardFlights;
