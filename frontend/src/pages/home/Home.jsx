import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import react, { useEffect, useState } from "react";
import CardFlights from "../../components/cardFlights/CardFlights";
import HotelCard from "../../components/cardHotel/CardHotel";
import CardTrains from "../../components/cardTrains/CardTrains";
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

console.log(`${process.env.REACT_APP_API_URL}`);

const Home = () => {
  const [type, setType] = useState("home");
  const [flightsData, setFlightsData] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const [trainData, setTrainData] = useState([]);
  const [notificationFlight, setNotificationFlight] = useState(null);
  const [showNotificationFlight, setShowNotificationFlight] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
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
    const fetchUserFlights = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/flights/flights`,
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

        setFlightsData(selectRandomFlights(data, 4));
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    const fetchUserHotels = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/hotels/getAllHotels`,
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

        setHotelsData(selectRandomHotels(data, 4));
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    const fetchUserTrains = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/trains/trains`,
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

        setTrainData(selectRandomTrains(data, 4));
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserTrains();
    fetchUserHotels();
    fetchUserFlights();
  }, []);
  
  const selectRandomFlights = (flights, number) => {
    return flights.sort(() => 0.5 - Math.random()).slice(0, number);
  };

  const selectRandomHotels = (hotels, number) => {
    return hotels.sort(() => 0.5 - Math.random()).slice(0, number);
  };

  const selectRandomTrains = (trains, number) => {
    return trains.sort(() => 0.5 - Math.random()).slice(0, number);
  };

  return (
    <div>
      <Navbar />
      <Header type={type} />
      <div className="homeContainer">
        <h1 className="flightsTitleHome">Discover unique places</h1>
        <div className="containerFlightHome">
          {flightsData.length > 0 ? (
            flightsData.map((outboundFlight, index) => {
              return (
                <CardFlights
                  outboundFlight={outboundFlight}
                  inboundFlight={null}
                  isRoundTrip={null}
                  flightOptions={null}
                  key={index}
                  select={false}
                />
              );
            })
          ) : (
            <p>No flights available</p>
          )}
        </div>
        <h1 className="hotelsTitle" style={{ marginTop: "70px" }}>
          Discover unique Hotels
        </h1>
        <div className="containerHotel">
          {hotelsData.length > 0 ? (
            hotelsData.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))
          ) : (
            <p>No hotels found</p>
          )}
        </div>
        <h1 className="trainsTitle" style={{ marginTop: "70px" }}>
          Discover new Trains Adventures
        </h1>
        <div className="containerTrain">
          {trainData.length > 0 ? (
            trainData.map((train, index) => (
              <CardTrains
                key={index}
                outboundTrain={train}
                isRoundTrip={null}
                trainOptions={null}
                select={false}
              />
            ))
          ) : (
            <p>No trains available</p>
          )}
        </div>
      </div>
      <Footer />
      {showNotificationFlight && notificationFlight && (
        <div className="notification-popup">
          <h4 style={{ fontSize: "36px" }}>Flight Sale</h4>
          <p>{notificationMessage} €</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '7%' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ textAlign: 'start'}}>Origin:</p>
                <p style={{ marginLeft: '10%', textAlign: 'end', fontWeight: '300'}}>{notificationFlight.airportOriginInfo.airportName}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ textAlign: 'start'}}>Destination:</p>
                <p style={{ marginLeft: '10%', textAlign: 'end', fontWeight: '300'}}>{notificationFlight.airportDestinationInfo.airportName}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ textAlign: 'start'}}>Date:</p>
                <p style={{ textAlign: 'end', fontWeight: '300'}}>{formatDate(notificationFlight.flightDate)}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ textAlign: 'start'}}>Flight Number:</p>
                <p style={{ textAlign: 'end', fontWeight: '300'}}>{notificationFlight.flightNumber}</p>
              </div>
            </div>
          <button onClick={() => setShowNotificationFlight(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Home;