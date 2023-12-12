import React, { useState, useEffect } from "react";
import "./hotelDetails.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/cardHotel/CardHotel";
import Footer from "../../components/footer/Footer";
import HotelCard from "../../components/cardHotel/CardHotel";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Hotel = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);

  const [stopsFilter, setStopsFilter] = useState("Any");
  const [departureTimeFilter, setDepartureTimeFilter] = useState("Any");
  const [durationFilter, setDurationFilter] = useState("Any");
  const [airlineFilter, setAirlineFilter] = useState("Any");

  const [flightData, setFlights] = useState([]);

  const handleSelectStops = (value) => {
    setStopsFilter(value);
  };

  const handleSelectDepartureTime = (value) => {
    setDepartureTimeFilter(value);
  };

  const handleSelectDuration = (value) => {
    setDurationFilter(value);
  };

  const handleSelectAirline = (value) => {
    setAirlineFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/flights");
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data");
        console.log(data);
        setFlights(data); // Update the airports state with the fetched data
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
      <Header type='hotels' />
      <div className="image-layout">
        <div className="image-large">
          {/* Image with the largest height goes here */}
          <img src="../../hotel1/largeview.jpg" alt="Small View 1" />
        </div>
        <div className="image-group">
          {/* Group of smaller images goes here */}
          <img src="path_to_small_image_1.jpg" alt="Small View 1" />
          <img src="path_to_small_image_2.jpg" alt="Small View 2" />
          {/* ... other images */}
      </div>
    </div>
      <div className="containerDetailsHotel">

       
        <div style={{width:"70%", marginBottom:"50px"}}>
          <ReviewCard />
        </div>

        <div style={{width:"70%"}}>
          <HotelCard type ='checkout' />
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Hotel;
