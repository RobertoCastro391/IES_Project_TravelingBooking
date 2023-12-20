import React from "react";
import layer1 from "../../components/images/Layer_1.png";

const CardFlightCheckout = ({ flight }) => {
  return (
    <div className="flight-details">
      <div className="flight-details1">
        <img
          src={`https://www.flightaware.com/images/airline_logos/90p/${flight["airline_Code"]["airlineICAO"]}.png`}
          className="airlineLogo"
          alt="Airline logo"
        />
        <div
          style={{
            flex: 20,
            display: "flex",
            flexDirection: "row",
          }}
        >
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
            <p className="text">{flight["airportCodeOrigin"]}</p>
          </div>
          <div className="div">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "5%",
                paddingRight: "5%",
                marginTop: "1%",
              }}
            >
              <p className="text">{flight["airline_Code"]["airlineName"]}</p>
              <p className="text">
                {flight["duration"].split(":")[0] +
                  "H:" +
                  flight["duration"].split(":")[1] +
                  "M"}
              </p>
            </div>
            <img className="svg-layer-flights" alt="Svg layer" src={layer1} />
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
            <p className="text">{flight["airportCodeDestination"]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFlightCheckout;
