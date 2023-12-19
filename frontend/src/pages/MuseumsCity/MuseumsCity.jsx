import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./museumscity.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardMuseumCity from "../../components/cardMuseumCity/CardMuseumCity";

const MuseumsCity = () => {
  const location = useLocation();
  const museums = location.state?.museums;
  const city = location.state?.city;

  console.log("city");
  console.log(museums);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Header type="museums"/>

      <div className="museumsCityContainer">
        <h1 className="museumsCityTitle">
          Explore this in: <i>{city}</i>
        </h1>
        <div className="museumsCityFeatured">
          {museums.map((museum, index) => (
            <CardMuseumCity
              key={index}
              imageUrl={museum.imageUrl}
              museum={museum}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MuseumsCity;
