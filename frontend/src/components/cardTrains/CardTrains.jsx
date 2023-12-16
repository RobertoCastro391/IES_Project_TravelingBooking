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

const CardTrains = ({ outboundTrain, isRoundTrip=null, trainOptions=null }) => {

  console.log("CardTrains")
  console.log(outboundTrain)

  const navigate = useNavigate();

  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleSelectTrain = (train) => {
    setSelectedTrain(train.id);
  };

  const handleBookTrain = (e, train) => {
    e.stopPropagation();

    const userId = localStorage.getItem("userId");

    if (userId) {
      localStorage.setItem("trainNumberOutbound", train['trainNumber']);
      localStorage.setItem("trainNumberInbound", null)
      navigate("/traincheckout", { state: {isRoundTrip: isRoundTrip, trainOptions: trainOptions, trainNumberOutbound: train['trainNumber'], trainNumberInbound: null }});
      alert(`You have booked train ${train['trainNumber']}!`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={`train-card ${selectedTrain === outboundTrain ? "selected" : ""}`} >
      <div className="train-details">
        <div className="train-details1">

          {outboundTrain && (
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
                  {outboundTrain["departureHour"].split(" ")[1]}
                </p>
                <p className="text">
                  {outboundTrain["stationOriginInfo"]["stationName"]}
                </p>
              </div>
              <div className="div">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "0.5%",
                  }}
                >
                  <p className="text">
                    {outboundTrain["trainNumber"]}
                  </p>
                  <p className="text">{outboundTrain["companyCode"]["trainCompanyName"]}</p>
                  <p className="text">
                    {
                      outboundTrain["duration"].split(":")[0] +
                      "H:" +
                      outboundTrain["duration"].split(":")[1] +
                      "M"
                    }
                  </p>
                </div>
                <img className="svg-layerTrains" src={trainengine} />
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
                  {outboundTrain["arrivalHour"].split(" ")[1]}
                </p>
                <p className="text">
                  {outboundTrain["stationDestinationInfo"]["stationName"]}
                </p>
              </div>
            </div>

          )}
        </div>

        <div className="TrainDetails">
          <button className="buttonTrainDetails" onClick>
            <div className="text-wrapper">View details</div>
          </button>
        </div>

      </div>
      <div className="Traininfo">
        {outboundTrain && (
          <div className="Prices">
            <div className="secondclass">
              <div className="class">
                2nd class
              </div>
              <div className="price">
                {outboundTrain["price2ndclass"]}€
              </div>
            </div>
            <div className="firstclass">
              <div className="class">
                1st class
              </div>
              <div className="price">
                {outboundTrain["price1stclass"]}€
              </div>
            </div>
          </div>

        )}
        <button className="buttonTrainSearch" onClick={(e) => handleBookTrain(e, outboundTrain)}>
          <div className="text-wrapper">Select</div>
          <img className="svg" alt="Svg" src={frame} />
        </button>
      </div>
    </div>
  );
};

export default CardTrains;
