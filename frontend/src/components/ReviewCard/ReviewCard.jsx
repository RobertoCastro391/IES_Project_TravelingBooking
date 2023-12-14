import React from "react";
import {
  fahotel
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faStar, faSnowflake, faPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./reviewCard.css";
import frame from "../images/Frame.png";


const RatingBar = ({ category, rating }) => {
  const maxRating = 5;
  const filledWidth = (rating / maxRating) * 100 + '%';

  return (
    <div className="rating-bar">
      <div className="rating-category">{category}</div>
      <div className="rating-track">
        <div className="rating-fill" style={{ width: filledWidth }}></div>
      </div>
      <div className="rating-score">{rating.toFixed(1)}</div>
    </div>
  );
};


const ReviewCards = ({hotel}) => {
  

  // const handleSelecthotel = (hotel) => {
  //   setSelectedhotel(hotel.id);
  // };

  // const handleBookhotel = (e, hotel) => {
  //   e.stopPropagation();
  //   navigate("/hotelcheckout");
  //   localStorage.setItem("hotel", hotel['hotelNumber']);
  //   alert(You have booked hotel ${hotel['hotelNumber']}!);
  // };
  const ratings = {
    Cleanliness: +hotel.cleanlinessReview,
    Location: +hotel.locationReview,
    Service: +hotel.serviceReview,
    Rooms: +hotel.roomsReview,
    Value: +hotel.valueReview,
    SleepQuality: +hotel.sleepQualityReview,
  };

  const totalRating = Object.values(ratings).reduce((acc, rating) => acc + rating, 0);
  const averageRating = Math.min((totalRating / Object.keys(ratings).length), 5).toFixed(1);

  return (
    <div className="reviews-card">
      <h3 className="reviews-title">Guest reviews</h3>
      <div className="average-rating">
        <span className="average-score">{averageRating}</span>
        <span className="total-reviews">12,501 reviews</span>
      </div>
      {Object.entries(ratings).map(([category, rating]) => (
        <RatingBar key={category} category={category} rating={rating} />
      ))}
    </div>
  );
};

export default ReviewCards;