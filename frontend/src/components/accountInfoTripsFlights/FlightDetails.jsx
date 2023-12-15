import React, { useEffect, useState } from "react";
import "./FlightDetails.css";
import layer1 from "../images/Layer_1.png";

const FlightDetails = ({ reservationInfo, imageUrl }) => {
  const [flightOutbound, setFlightOutbound] = useState();
  const [flightInbound, setFlightInbound] = useState();
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
    const fetchFlightInfo = async () => {
      try {
        
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/flights/flightCheckout/${reservationInfo["flightNumberOutbound"]}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFlightOutbound(data);

        if (
          reservationInfo["flightNumberInbound"] !== null &&
          reservationInfo["roundTrip"] === true
        ) {
          const response2 = await fetch(
            `${process.env.REACT_APP_API_URL}/api/flights/flightCheckout/${reservationInfo["flightNumberInbound"]}`
          );

          if (!response2.ok) {
            throw new Error("Network response was not ok");
          }

          const data2 = await response2.json();
          setFlightInbound(data2);
        }
      } catch (error) {
        console.error("Failed to fetch flight info:", error);
      }
    };
    fetchFlightInfo();
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
          {flightOutbound && (
            <span
              style={{
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {flightOutbound["airportDestinationInfo"]["airportName"]}
            </span>
          )}
          <div className="flightTimes">
            {flightOutbound && (
              <img
                src={`https://www.flightaware.com/images/airline_logos/90p/${flightOutbound["airline_Code"]["airlineICAO"]}.png`}
                alt="Airline Logo"
                className="airlineLogoFlightDetails"
              />
            )}
            <div className="outbound">
              <div className="outbound1">
                <span className="label">Outbound - </span>
                <span>
                  {flightOutbound ? (
                    <label
                      style={{ flex: "auto", marginLeft: "2%", width: "100%" }}
                    >
                      {formatDate(flightOutbound.flightDate.split("T")[0])}
                    </label>
                  ) : (
                    "Loading..."
                  )}
                </span>
              </div>
              {flightOutbound ? (
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
                      {flightOutbound["departureHour"].split(" ")[1]}
                    </p>
                    <p className="text">
                      {flightOutbound["airportCodeOrigin"]}
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
                      <p className="text">{flightOutbound["flightNumber"]}</p>
                      <p className="text">
                        {flightOutbound["airline_Code"]["airlineName"]}
                      </p>
                      <p className="text">
                        {flightOutbound["duration"].split(":")[0] +
                          "H:" +
                          flightOutbound["duration"].split(":")[1] +
                          "M"}
                      </p>
                    </div>
                    <img
                      className="svg-layer"
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
                      {flightOutbound["arrivalHour"].split(" ")[1]}
                    </p>
                    <p className="text">
                      {flightOutbound["airportCodeDestination"]}
                    </p>
                  </div>
                </div>
              ) : (
                "Loading..."
              )}
            </div>
          </div>
          {reservationInfo["roundTrip"] === true && flightInbound && (
            <div className="flightTimes">
              {flightInbound && (
                <img
                  src={`https://www.flightaware.com/images/airline_logos/90p/${flightInbound["airline_Code"]["airlineICAO"]}.png`}
                  alt="Airline Logo"
                  className="airlineLogoFlightDetails"
                />
              )}
              <div className="outbound">
                <div className="outbound1">
                  <span className="label">Return - </span>
                  <span>
                    {flightInbound ? (
                      <label
                        style={{
                          flex: "auto",
                          marginLeft: "2%",
                          width: "100%",
                        }}
                      >
                        {formatDate(flightInbound.flightDate.split("T")[0])}
                      </label>
                    ) : (
                      "Loading..."
                    )}
                  </span>
                </div>
                {flightInbound ? (
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
                        {flightInbound["departureHour"].split(" ")[1]}
                      </p>
                      <p className="text">
                        {flightInbound["airportCodeOrigin"]}
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
                        <p className="text">{flightInbound["flightNumber"]}</p>
                        <p className="text">
                          {flightInbound["airline_Code"]["airlineName"]}
                        </p>
                        <p className="text">
                          {flightInbound["duration"].split(":")[0] +
                            "H:" +
                            flightInbound["duration"].split(":")[1] +
                            "M"}
                        </p>
                      </div>
                      <img
                        className="svg-layer"
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
                        {flightInbound["arrivalHour"].split(" ")[1]}
                      </p>
                      <p className="text">
                        {flightInbound["airportCodeDestination"]}
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
      </div>
      <div className="flightDetailsBody">
        <img src={imageUrl} alt="paris" className="destinationImage" />
      </div>
      <button className="detailsButton" onClick={toggleModal}>
        See Details
      </button>
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {flightOutbound && reservationInfo && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p style={{ textAlign: "center" }}>
                    {flightOutbound["airportDestinationInfo"]["airportName"]}
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

export default FlightDetails;
