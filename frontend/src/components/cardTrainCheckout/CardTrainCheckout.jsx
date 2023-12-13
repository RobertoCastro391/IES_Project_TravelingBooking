import React from "react";
import trainengine from "../images/trainfigma.png";

const CardTrainCheckout = ({ train }) => {
  return (
    <div className="Train-details">
      <div className="Train-details1">
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
            <p className="text">{train["departureHour"].split(" ")[1]}</p>
            <p className="text">{train["stationCodeOrigin"]}</p>
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
              <p className="text">{train["companyCode"]["trainCompanyName"]}</p>
              <p className="text">
                {
                    train["duration"].split(":")[0] +
                    "H:" +
                    train["duration"].split(":")[1] +
                    "M"}
              </p>
            </div>
            <img className="svg-layer" alt="Svg layer" src={trainengine} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "2%",
            }}
          >
            <p className="text">{train["arrivalHour"].split(" ")[1]}</p>
            <p className="text">{train["stationCodeDestination"]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTrainCheckout;
