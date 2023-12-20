import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./museumscity.css";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardMuseumCity from "../../components/cardMuseumCity/CardMuseumCity";
import pic1  from "../../static/museums/1.jpg";
import pic2  from "../../static/museums/12.jpg";
import pic3  from "../../static/museums/13.jpg";
import pic4  from "../../static/museums/14.jpg";
import pic5  from "../../static/museums/15.jpg";
import pic6  from "../../static/museums/16.jpg";
import pic7  from "../../static/museums/17.jpg";

const MuseumsCity = () => {
  const location = useLocation();
  const museums = location.state?.museums;
  const city = location.state?.city;

  console.log("city");
  console.log(museums);

  const navigate = useNavigate();

  const cardsPerRow = 3;

  // Create an array of arrays, each containing three cards
  const rows = [];
  for (let i = 0; i < museums.length; i += cardsPerRow) {
    rows.push(museums.slice(i, i + cardsPerRow));
  }

  const allImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7];

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const selectRandomImages = () => {
      let shuffled = allImages
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

      setSelectedImages(shuffled);
    };

    selectRandomImages();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="museums" />

      <div className="museumsCityContainer">
        <h1 className="museumsCityTitle">
          Explore this in: <i>{city}</i>
        </h1>
        {rows.map((row, rowIndex) => (
          <div className="museumsCityFeatured" key={rowIndex}>
            {row.map((museum, cardIndex) => (
              <CardMuseumCity
                key={cardIndex}
                imageUrl={selectedImages[rowIndex * cardsPerRow + cardIndex]}
                museum={museum}
              />
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default MuseumsCity;
