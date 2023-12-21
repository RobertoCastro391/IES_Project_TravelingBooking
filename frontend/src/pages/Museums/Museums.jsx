import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./museums.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardMuseum from "../../components/cardMuseums/CardMuseums";
import pic1 from "../../static/museums/1.jpg";
import pic2 from "../../static/museums/2.jpg";
import pic3 from "../../static/museums/3.jpg";
import pic4 from "../../static/museums/4.jpg";
import pic5 from "../../static/museums/5.jpg";
import pic6 from "../../static/museums/6.jpg";
import pic7 from "../../static/museums/7.jpg";
import pic8 from "../../static/museums/8.jpg";
import pic9 from "../../static/museums/9.jpg";
import pic10 from "../../static/museums/10.jpg";
import pic11 from "../../static/museums/11.jpg";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Museums = () => {
  const [museumsData, setMuseumsData] = useState([]);
  const [type, setType] = useState("museums");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationFlight, setNotificationFlight] = useState(null);
  const [showNotificationFlight, setShowNotificationFlight] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

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
  ];

  const [selectedImages, setSelectedImages] = useState([]);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    if (showNotificationFlight) {
      setTimeout(() => {
        setShowNotificationFlight(false);
      }, 7000);
    }
  }, [showNotificationFlight]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/museums/museums`)
      .then((response) => response.json())
      .then((data) => setMuseumsData(data))
      .catch((error) => console.error("Error fetching data:", error));

    if (location.state && location.state.headerType) {
      setType(location.state.headerType);
    }

    const selectRandomImages = () => {
      let shuffled = allImages
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 9);

      setSelectedImages(shuffled);
    };

    selectRandomImages();
  }, [location]);

  const cardsPerRow = 3;

  const rows = [];
  for (let i = 0; i < 9; i += cardsPerRow) {
    rows.push(museumsData.slice(i, i + cardsPerRow));
  }

  console.log("OKKKKKK00");
  console.log(museumsData);

  return (
    <div>
      <Navbar />
      <Header type={type} />

      <div className="museumsContainer">
        <h1 className="museumsTitle">Discover unique places</h1>

        {rows.map((row, rowIndex) => (
          <div className="museumsFeatured" key={rowIndex}>
            {row.map((museum, cardIndex) => (
              <CardMuseum
                key={cardIndex}
                imageUrl={selectedImages[rowIndex * cardsPerRow + cardIndex]}
                museum={museum}
              />
            ))}
          </div>
        ))}
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

export default Museums;
