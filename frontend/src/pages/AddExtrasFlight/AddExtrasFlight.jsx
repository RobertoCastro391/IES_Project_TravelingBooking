import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./AddExtrasFlight.css";

const AddExtrasFlight = () => {
  
  const flightDate = localStorage.getItem("flightDate");
  const isOneWay = localStorage.getItem("isOneWay");
  const flightNumber = localStorage.getItem("flight");
  const [flight, setFlight] = useState([]);

  console.log("flight");
  console.log(flightNumber);

  const url = "http://localhost:8080/api/flightCheckout/" + flightNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data");
        console.log(data);
        setFlight(data); // Update the airports state with the fetched data
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="addExtrasFLight" />
      <div className="containerFlightADD">
        <div className="row">
          <div className="col">
            <h1>Extras</h1>
            {isOneWay === "false" ? (
              <div>
                <div className="col-2">
                  <p>Outbound, {flightDate.split(",")[0]}</p>
                  <p>All times are local</p>
                </div>

                <div className="card">
                    {flight && flight['airline_Code'] ? (
                        <p>{flight['flightNumber']}</p>
                    ) : (
                      "Loading..."
                    )}
                </div>

                <div className="col-2">
                  <p>Return, {flightDate.split(",")[1]}</p>
                  <p>All times are local</p>
                </div>
                <div className="card"></div>
              </div>
            ) : (
              <div className="col-2">
                <p>Outbound, {flightDate.split(",")[0]}</p>
                <p>All times are local</p>
              </div>
            )}
          </div>
          <div className="col">
            <h1>Extras</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddExtrasFlight;
