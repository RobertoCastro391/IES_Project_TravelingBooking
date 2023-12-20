import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import HotelCard from "../../components/cardHotel/CardHotel"
import "./hotel.css";

const Hotels = () => {
  const [hotelsData, setHotelsData] = useState([]);

  useEffect(() => {
    const fetchUserHotels = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hotels/getAllHotels`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log("Fetched Data Hotels:");
        console.log(data);

        // Select 10 random hotels
        setHotelsData(selectRandomHotels(data, 10));

      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserHotels();
  }, []);

  // Function to select 10 random hotels
  const selectRandomHotels = (hotels, number) => {
    return hotels.sort(() => 0.5 - Math.random()).slice(0, number);
  };

  return (
    <div>
      <Navbar />
      <Header type={"hotels"} />

      <div className="hotelsContainer">
        <h1 className="hotelsTitle">Discover unique Hotels</h1>
        <div className="containerHotel">
          {hotelsData.length > 0 ? (
            hotelsData.map((hotel, index) => (
              <HotelCard
                key={index}
                hotel={hotel}
              />
            ))
          ) : (
            <p>No hotels found</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Hotels;
