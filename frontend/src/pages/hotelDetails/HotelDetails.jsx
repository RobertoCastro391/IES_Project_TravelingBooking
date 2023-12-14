import React, { useState, useEffect } from "react";
import "./hotelDetails.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/cardHotel/CardHotel";
import Footer from "../../components/footer/Footer";
import HotelCard from "../../components/cardHotel/CardHotel";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa o CSS padrão
import pic1 from "../../static/hotel/1.jpg";
import pic2 from "../../static/hotel/2.jpg";
import pic3 from "../../static/hotel/3.jpg";
import pic4 from "../../static/hotel/4.jpg";
import pic5 from "../../static/hotel/5.jpg";
import pic6 from "../../static/hotel/6.jpg";
import pic7 from "../../static/hotel/7.jpg";
import pic8 from "../../static/hotel/8.jpg";
import pic9 from "../../static/hotel/9.jpg";
import pic10 from "../../static/hotel/10.jpg";
import pic11 from "../../static/hotel/11.jpg";
import pic12 from "../../static/hotel/12.jpg";
import pic13 from "../../static/hotel/13.jpg";
import pic14 from "../../static/hotel/14.jpg";
import pic15 from "../../static/hotel/15.jpg";


const Hotel = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);

  const [stopsFilter, setStopsFilter] = useState("Any");
  const [departureTimeFilter, setDepartureTimeFilter] = useState("Any");
  const [durationFilter, setDurationFilter] = useState("Any");
  const [airlineFilter, setAirlineFilter] = useState("Any");

  const [flightData, setFlights] = useState([]);

  const location = useLocation();
  const hotelData = location.state?.hotel;

  console.log("hotelData");
  console.log(hotelData);

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

  const allImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15];

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const selectRandomImages = () => {
      let shuffled = allImages
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 4);

      setSelectedImages(shuffled);
    };

    selectRandomImages();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/api/flights");
  //       console.log(response);

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       console.log("data");
  //       console.log(data);
  //       setFlights(data); // Update the airports state with the fetched data
  //     } catch (error) {
  //       console.error(
  //         "There has been a problem with your fetch operation:",
  //         error
  //       );
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <Navbar />
      <Header type='hotels' />
      <Carousel 
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={5000}>
        {selectedImages.map((imgSrc, index) => (
          <div key={index}>
            <img src={imgSrc} alt={`Hotel View ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      
      <div className="containerDetailsHotel">
      
       
        <div style={{width:"70%", marginBottom:"50px"}}>
          <ReviewCard  hotel={hotelData}/>
        </div>

        <div style={{width:"70%"}}>
          <HotelCard type ='checkout' 
                hotel={hotelData} />
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Hotel;
