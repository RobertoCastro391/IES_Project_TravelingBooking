import React, { useEffect, useState } from "react";
import "./TrainDetails.css";
import layer1 from "../images/trainfigma.png";

const TrainDetails = ({ reservationInfo, imageUrl }) => {
  const [trainOutbound, setTrainOutbound] = useState();
  const [trainInbound, setTrainInbound] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (!isModalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  useEffect(() => {
    const fetchTrainInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/trains/trainCheckout/${reservationInfo["trainNumberOutbound"]}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTrainOutbound(data);

        if (
          reservationInfo["trainNumberInbound"] !== null &&
          reservationInfo["roundTrip"] === true
        ) {
          const response2 = await fetch(
            `${process.env.REACT_APP_API_URL}/api/trains/trainCheckout/${reservationInfo["trainNumberInbound"]}`
          );

          if (!response2.ok) {
            throw new Error("Network response was not ok");
          }

          const data2 = await response2.json();
          setTrainInbound(data2);
        }
      } catch (error) {
        console.error("Failed to fetch flight info:", error);
      }
    };
    fetchTrainInfo();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-EN", options);
  };

  return (
    <div className="flightDetailsCard">
      <div className="flightDetailsHeader">
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {trainOutbound && (
            <span
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {trainOutbound["stationDestinationInfo"]["stationName"]}
            </span>
          )}
          <div className="flightTimes">
            <div className="outbound">
              <div className="outbound1">
                <span className="label">Outbound - </span>
                <span>
                  {trainOutbound ? (
                    <label
                      style={{ flex: "auto", marginLeft: "2%", width: "100%" }}
                    >
                      {formatDate(trainOutbound.travelDate.split("T")[0])}
                    </label>
                  ) : (
                    "Loading..."
                  )}
                </span>
              </div>
              {trainOutbound ? (
                <div
                  style={{
                    flex: 20,
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "1.5%",
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
                    <p className="text">
                      {trainOutbound["departureHour"].split(" ")[1]}
                    </p>
                    <p className="text">{trainOutbound["stationCodeOrigin"]}</p>
                  </div>
                  <div className="div">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.5%",
                      }}
                    >
                      <p className="text">{trainOutbound["trainNumber"]}</p>
                      <p className="text">
                        {trainOutbound["companyCode"]["trainCompanyName"]}
                      </p>
                      <p className="text">
                        {trainOutbound["duration"].split(":")[0] +
                          "H:" +
                          trainOutbound["duration"].split(":")[1] +
                          "M"}
                      </p>
                    </div>
                    <img
                      className="svg-layerTrains"
                      style={{ top: "-9.5px" }}
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
                      {trainOutbound["arrivalHour"].split(" ")[1]}
                    </p>
                    <p className="text">
                      {trainOutbound["stationCodeDestination"]}
                    </p>
                  </div>
                </div>
              ) : (
                "Loading..."
              )}
            </div>
          </div>
          {reservationInfo["roundTrip"] === true && trainInbound && (
            <div className="flightTimes">
              <div className="outbound">
                <div className="outbound1">
                  <span className="label">Return - </span>
                  <span>
                    {trainInbound ? (
                      <label
                        style={{
                          flex: "auto",
                          marginLeft: "2%",
                          width: "100%",
                        }}
                      >
                        {formatDate(trainInbound.travelDate.split("T")[0])}
                      </label>
                    ) : (
                      "Loading..."
                    )}
                  </span>
                </div>
                {trainInbound ? (
                  <div
                    style={{
                      flex: 20,
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "1.5%",
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
                      <p className="text">
                        {trainInbound["departureHour"].split(" ")[1]}
                      </p>
                      <p className="text">
                        {trainInbound["stationCodeOrigin"]}
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
                        <p className="text">{trainInbound["trainNumber"]}</p>
                        <p className="text">
                          {trainInbound["companyCode"]["trainCompanyName"]}
                        </p>
                        <p className="text">
                          {trainInbound["duration"].split(":")[0] +
                            "H:" +
                            trainInbound["duration"].split(":")[1] +
                            "M"}
                        </p>
                      </div>
                      <img
                        className="svg-layerTrains"
                        style={{ top: "-9.5px" }}
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
                        {trainInbound["arrivalHour"].split(" ")[1]}
                      </p>
                      <p className="text">
                        {trainInbound["stationCodeDestination"]}
                      </p>
                    </div>
                  </div>
                ) : (
                  "Loading..."
                )}
              </div>
            </div>
          )}
        </div>
        <button className="detailsButton" onClick={toggleModal}>
          See Details
        </button>
      </div>

      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {trainOutbound && reservationInfo && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p style={{ textAlign: "center" }}>
                    {trainOutbound["stationDestinationInfo"]["stationName"]}
                  </p>
                </div>
                <div style={{ display: "flex", marginTop: "1%" }}>
                  <p>Reservation Code</p>
                  <p style={{ marginRight: "1%" }}>:</p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    {reservationInfo["reservationID"]}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "1%",
                  }}
                >
                  <p>Passengers</p>
                  <p style={{ marginRight: "1%" }}>:</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    {reservationInfo &&
                    reservationInfo["passengers"].length > 0 ? (
                      reservationInfo["passengers"].map((passenger, index) => (
                        <div key={index} style={{ display: "flex" }}>
                          <p
                            style={{
                              color: "black",
                              fontWeight: "500",
                              marginRight: "1%",
                            }}
                          >
                            {passenger.firstName}
                          </p>
                          <p style={{ color: "black", fontWeight: "500" }}>
                            {passenger.lastName}
                          </p>
                        </div>
                      ))
                    ) : (
                      <span>No passengers found.</span>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "1%",
                  }}
                >
                  <p>Reservation Date</p>
                  <p style={{ marginRight: "1%" }}>:</p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    {reservationInfo["reservationDate"].split("T")[0]}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "1%",
                  }}
                >
                  <p>Price</p>
                  <p style={{ marginRight: "1%" }}>:</p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    {reservationInfo["totalPrice"]} €
                  </p>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="detailsButton" onClick={toggleModal}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainDetails;
