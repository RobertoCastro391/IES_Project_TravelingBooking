import React from "react";
import layer1 from "../../components/images/Layer_1.png";

const CardFlightsOptions = ({flight}) => {
  return (
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
            <p className="text">{flight["airline_Code"]["airlineName"]}</p>
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
  );
};

export default CardFlightsOptions;
