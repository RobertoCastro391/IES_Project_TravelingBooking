import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardFlightsOptions from "../../components/cardFlightsOptions/CardFlightsOptions";
import "./AddExtrasFlight.css";
import important from "../../static/important.png";
import backpack from "../../static/backPack.png";
import handluggage from "../../static/handluggage.png";
import checked from "../../static/checked.png";
import { useNavigate, useLocation } from "react-router-dom";


const AddExtrasFlight = () => {
  const flightDate = localStorage.getItem("flightDate");
  const location = useLocation();
  const isRoundTrip = location.state?.isRoundTrip;
  const flightOptions = location.state?.flightOptions;
  const flightNumberOutbound = localStorage.getItem("flightOutbound");
  const flightNumberInbound = localStorage.getItem("flightInbound");  
  const [outboundFlight, setOutboundFlight] = useState(null);
  const [inboundFlight, setInboundFlight] = useState(null);
  const navigate = useNavigate();

  const formatDateWithDay = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const [day, month, year] = dateString.split("/");
    const formattedDate = new Date(`${year}/${month}/${day}`);
    const dayName = days[formattedDate.getDay()];
    return `${dayName}, ${dateString}`;
  };

  const hanleContinue = () => {
    navigate("/flightCheckout", { state: { isRoundTrip, flightOptions }});
  };

  useEffect(() => {
    const fetchData = async (flightNumber, setFlightFunc) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/flights/flightCheckout/${flightNumber}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Flight response:", data);

        setFlightFunc(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };
    if (flightNumberOutbound) {
      fetchData(flightNumberOutbound, setOutboundFlight);
    }

    if (isRoundTrip === true && flightNumberInbound) {
      fetchData(flightNumberInbound, setInboundFlight);
    }
  }, [flightNumberOutbound, flightNumberInbound, isRoundTrip]);

  return (
    <div>
      <Navbar />
      <Header type="addExtrasFLight" isRoundTrip={isRoundTrip} flightOptions={flightOptions} />
      <div className="containerFlightADD">
        <div className="row">
          <div className="col">
            {isRoundTrip === true ? (
              <div>
                <p>Outbound,</p>
                <div className="col-2">
                  <p style={{ color: "black", fontSize: "15px" }}>
                    {formatDateWithDay(flightDate.split(",")[0])}
                  </p>
                  <p style={{ color: "black", fontSize: "15px" }}>
                    All times are local
                  </p>
                </div>

                <div className="card">
                  {outboundFlight && outboundFlight["airline_Code"] ? (
                    <div className="card">
                      <CardFlightsOptions flight={outboundFlight} />
                    </div>
                  ) : (
                    "Loading..."
                  )}
                </div>

                <p>Return,</p>
                <div className="col-2">
                  <p style={{ color: "black", fontSize: "15px" }}>
                    {formatDateWithDay(flightDate.split(",")[1])}
                  </p>
                  <p style={{ color: "black", fontSize: "15px" }}>
                    All times are local
                  </p>
                </div>
                <div className="card">
                  {inboundFlight && inboundFlight["airline_Code"] ? (
                    <div className="card">
                      <CardFlightsOptions flight={inboundFlight} />
                    </div>
                  ) : (
                    "Loading..."
                  )}
                </div>
              </div>
            ) : (
              <div>
                <p>Outbound,</p>
                <div className="col-2">
                  <p style={{ color: "black", fontSize: "15px" }}>
                    {formatDateWithDay(flightDate.split(",")[0])}
                  </p>
                  <p style={{ color: "black", fontSize: "15px" }}>
                    All times are local
                  </p>
                </div>

                <div className="card">
                  {outboundFlight && outboundFlight["airline_Code"] ? (
                    <div className="card">
                      <CardFlightsOptions flight={outboundFlight} />
                    </div>
                  ) : (
                    "Loading..."
                  )}
                </div>
              </div>
            )}

            <div className="col">
              <p> Book your ticket </p>
              <div className="card" style={{ padding: "2%" }}>
                <div className="row">
                  <div>
                    <img src={important} className="important" />
                  </div>
                  <p style={{ marginLeft: "2%", color: "black" }}>
                    {" "}
                    Read before making your reservation
                  </p>
                </div>
                <p
                  style={{
                    marginTop: "2%",
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                >
                  Prices shown always include an estimate of all mandatory taxes
                  and charges, but remember to check ALL ticket details, final
                  prices and terms and conditions on the reservation website
                  before you make your reservation.
                </p>
                <p style={{ marginTop: "2%" }}>Check for extra fees</p>
                <p
                  style={{
                    marginTop: "1%",
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                >
                  Some airlines / travel agencies charge extra for baggage,
                  insurance or use of credit cards and include a service fee.
                </p>
                <p style={{ marginTop: "2%" }}>
                  Check T&Cs for travelers aged 12-16
                </p>
                <p
                  style={{
                    marginTop: "1%",
                    color: "black",
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                >
                  Restrictions may apply to young passengers traveling alone.
                </p>
              </div>
            </div>
            <div className="col">
              <p> Extra Baggage </p>

              <div className="baggage">
                <div className="baggage-1">
                  <div className="card-1">
                    <img src={backpack} className="baggageImage" />
                  </div>
                  <div className="card-1">
                    <img src={handluggage} className="baggageImage" />
                  </div>
                  <div className="card-1">
                    <img src={checked} className="baggageImage" />
                  </div>
                </div>
                <div className="baggage-2">
                  <p style={{ color: "black", fontSize: "15px" }}>
                    Backpack (included)
                  </p>
                  <p style={{ color: "black", fontSize: "15px" }}>
                    Hand baggage(+15,60 €)
                  </p>
                  <p style={{ color: "black", fontSize: "15px" }}>
                    Checked Baggage(+50,45 €)
                  </p>
                </div>
              </div>
            </div>
            <div className="col" style={{ marginTop: "2%" }}>
              <p> Insurance </p>
              <div className="insurance">
                <div className="insurance-1">
                  <div>
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                      }}
                    >
                      Premium (+ 43,55 €)
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                      }}
                    >
                      Basic (+24,15 €)
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "black",
                        fontSize: "15px",
                        justifyContent: "center",
                      }}
                    >
                      No insurance
                    </p>
                  </div>
                </div>
                <div className="insurance-2">
                  <p className="insurance-Text">Medical expenses</p>
                  <p className="insurance-Text">
                    Cancellation of the trip due to illness, death or accident
                  </p>
                  <p className="insurance-Text">Support Services</p>
                  <p className="insurance-Text">Lost luggage</p>
                  <p className="insurance-Text">Travel insurance</p>
                  <p className="insurance-Text">Responsibilities</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "2%", alignSelf: "end" }}>
              <button className="buttonContinue" onClick={hanleContinue}>
                Continue
              </button>
            </div>
          </div>
          <div className="col-3">
            <h1>Extras</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddExtrasFlight;
