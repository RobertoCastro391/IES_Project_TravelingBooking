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
import { Carousel } from "react-responsive-carousel";
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
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

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
  const dates = location.state?.dates;
  const hotelOptions = location.state?.hotelOptions;
  const [notificationFlight, setNotificationFlight] = useState(null);
  const [showNotificationFlight, setShowNotificationFlight] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const fetchFlight = async (flightNumber) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/flights/flightCheckout/${flightNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    const stompClient = Stomp.over(
      // () => new SockJS(`${process.env.REACT_APP_API_URL}/ws`)
      () => new SockJS(`${process.env.REACT_APP_API_URL}/ws`)
    );

    stompClient.connect({}, (frame) => {
      stompClient.subscribe("/topic/flightPriceUpdate", async (message) => {
        const flightPriceUpdate = JSON.parse(message.body);
        console.log("New Flight Price:", flightPriceUpdate);
        const flight = await fetchFlight(flightPriceUpdate.flightNumber);
        console.log("New Flight:", flight);
        setNotificationMessage(`New Price: ${flightPriceUpdate.price}`);
        setNotificationFlight(flight);
        setShowNotificationFlight(true);
      });
    });

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (showNotificationFlight) {
      setTimeout(() => {
        setShowNotificationFlight(false);
      }, 7000);
    }
  }, [showNotificationFlight]);

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

  const allImages = [
    pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    pic6,
    pic7,
    pic8,
    pic9,
    pic10,
    pic11,
    pic12,
    pic13,
    pic14,
    pic15,
  ];

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const selectRandomImages = () => {
      let shuffled = allImages
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 4);

      setSelectedImages(shuffled);
    };

    selectRandomImages();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="hotels" />
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={5000}
      >
        {selectedImages.map((imgSrc, index) => (
          <div key={index}>
            <img src={imgSrc} alt={`Hotel View ${index + 1}`} />
          </div>
        ))}
      </Carousel>

      <div className="containerDetailsHotel">
        <div style={{ width: "70%", marginBottom: "50px" }}>
          <ReviewCard hotel={hotelData} />
        </div>

        <div style={{ width: "70%" }}>
          <HotelCard
            type="checkout"
            hotel={hotelData}
            dates={dates}
            hotelOptions={hotelOptions}
          />
        </div>
      </div>
      <Footer />
      {showNotificationFlight && notificationFlight && (
        <div className="notification-popup">
          <h4 style={{ fontSize: "36px" }}>Flight Sale</h4>
          <p>{notificationMessage} €</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "7%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ textAlign: "start" }}>Origin:</p>
              <p
                style={{
                  marginLeft: "10%",
                  textAlign: "end",
                  fontWeight: "300",
                }}
              >
                {notificationFlight.airportOriginInfo.airportName}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ textAlign: "start" }}>Destination:</p>
              <p
                style={{
                  marginLeft: "10%",
                  textAlign: "end",
                  fontWeight: "300",
                }}
              >
                {notificationFlight.airportDestinationInfo.airportName}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ textAlign: "start" }}>Date:</p>
              <p style={{ textAlign: "end", fontWeight: "300" }}>
                {formatDate(notificationFlight.flightDate)}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p style={{ textAlign: "start" }}>Flight Number:</p>
              <p style={{ textAlign: "end", fontWeight: "300" }}>
                {notificationFlight.flightNumber}
              </p>
            </div>
          </div>
          <button onClick={() => setShowNotificationFlight(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Hotel;
