import React, { useEffect, useState } from "react";
import "./HotelDetails.css";
import layer1 from "../images/trainfigma.png";
import HotelCard from "../cardHotel/CardHotel";

const HotelDetails = ({ reservationInfo, imageUrl }) => {
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
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/trains/trainCheckout/${reservationInfo["trainNumberOutbound"]}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
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
            `${process.env.REACT_APP_API_URL}/api/trains/trainCheckout/${reservationInfo["trainNumberInbound"]}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
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
        </div>
        <div style={{ backgroundColor: "#EFF1F2", borderRadius: "8px", width: "85%"}}>
            <HotelCard type ='book'  hotel={reservationInfo["hotel"]} />
            
          </div>
        <button className="detailsButton" onClick={toggleModal}>
          See Details
        </button>
      </div>

      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {reservationInfo && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p style={{ textAlign: "center" }}>
                    {reservationInfo["hotel"]["hotelName"]}
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

export default HotelDetails;
