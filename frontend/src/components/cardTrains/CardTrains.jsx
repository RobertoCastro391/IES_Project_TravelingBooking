import React from "react";
import {
  faTrain
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardTrains.css";
import frame from "../images/Frame.png";
import trainengine from "../images/trainfigma.png";
import tracks from "../images/tracksfigma.png";

const CardTrains = () => {
  const navigate = useNavigate();

  const [selectedTrain, setSelectedTrain] = useState(null);

  // const handleSelectTrain = (train) => {
  //   setSelectedTrain(train.id);
  // };

  // const handleBookTrain = (e, train) => {
  //   e.stopPropagation();
  //   navigate("/traincheckout");
  //   localStorage.setItem("train", train['trainNumber']);
  //   alert(`You have booked train ${train['trainNumber']}!`);
  // };

  return (
    <div className={`train-card`} >
      <div className="train-details">
        <div className="train-details1">
          {/* <img
            src={`https://www.flightaware.com/images/airline_logos/90p/${train["airline_Code"]["airlineICAO"]}.png`}
            className="airlineLogo"
            alt="Airline logo"
          /> */}
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
              <p className="text">05h19</p>
              <p className="text">Zurich</p>
            </div>
            <div className="div">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.5%",
                }}
              >
                <p className="text">77456</p>
                <p className="text">Golden Express</p>
                <p className="text">
                  03h12
                </p>
              </div>
              <img className="svg-layer" src={trainengine} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "2%",
              }}
            >
              <p className="text">08h31</p>
              <p className="text">Geneva</p>
            </div>
          </div>
        </div>

        <div className="TrainDetails">
          <button className="buttonTrainDetails" onClick>
            <div className="text-wrapper">View details</div>
          </button>
        </div>

        {/* <div className="train-details1">
            <img
              src={`https://www.flightaware.com/images/airline_logos/90p/${train["airline_Code"]["airlineICAO"]}.png`}
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
                <p className="text">{train["arrivalHour"].split(" ")[1]}</p>
                <p className="text">{train["airport_code_destination"]}</p>
              </div>
              <div className="div">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.5%z",
                  }}
                >
                  <p className="text">{train["trainNumber"]}</p>
                  <p className="text">
                    {train["airline_Code"]["airlineName"]}
                  </p>
                  <p className="text">
                    {train["duration"].split(":")[0] +
                      "H:" +
                      train["duration"].split(":")[1] +
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
                <p className="text">{train["departureHour"].split(" ")[1]}</p>
                <p className="text">{train["airport_code_origin"]}</p>
              </div>
            </div>
          </div> */}
      </div>
      <div className="Traininfo">
        <div className="Prices">
          <div className="secondclass">
            <div className="class">
              2nd class
            </div>
            <div className="price">
              85.80€
            </div>
          </div>
          <div className="firstclass">
            <div className="class">
              1st class
            </div>
            <div className="price">
              147€
            </div>
          </div>
        </div>
        <button className="buttonTrainSearch" onClick>
          <div className="text-wrapper">Select</div>
          <img className="svg" alt="Svg" src={frame} />
        </button>
      </div>
    </div>
  );
};

export default CardTrains;
