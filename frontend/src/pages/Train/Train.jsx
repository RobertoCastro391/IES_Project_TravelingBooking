import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import CardTrains from "../../components/cardTrains/CardTrains";
import "./train.css";

const Trains = () => {
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    const fetchUserTrains = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trains/trains`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("Fetched Data Trains:");
        console.log(data);

        // Select random trains
        setTrainData(selectRandomTrains(data, 10));

      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserTrains();
  }, []);

  // Function to select random trains
  const selectRandomTrains = (trains, number) => {
    return trains.sort(() => 0.5 - Math.random()).slice(0, number);
  };

  return (
    <div>
      <Navbar />
      <Header type={"trains"} />

      <div className="trainsContainer">
        <h1 className="trainsTitle">Discover new Trains Adventures</h1>
        <div className="containerTrain">
          {trainData.length > 0 ? (
            trainData.map((train, index) => (
              <CardTrains
                key={index}
                outboundTrain={train} 
                isRoundTrip={null} 
                trainOptions={null}
              />
            ))
          ) : (
            <p>No trains available</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Trains;
