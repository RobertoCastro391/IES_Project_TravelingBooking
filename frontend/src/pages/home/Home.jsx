import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import { useEffect, useState } from "react";
import CardFlights from "../../components/cardFlights/CardFlights";
import HotelCard from "../../components/cardHotel/CardHotel"
import CardTrains from "../../components/cardTrains/CardTrains";

console.log(`${process.env.REACT_APP_API_URL}`);


const Home = () => {
  const [type, setType] = useState("home");
  const [flightsData, setFlightsData] = useState([]);
  const [hotelsData, setHotelsData] = useState([]);
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    const fetchUserFlights = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/flights`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('Fetched Data Flights:');
        console.log(data);

        // Select random flights
        setFlightsData(selectRandomFlights(data, 4));

      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

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
        setHotelsData(selectRandomHotels(data, 4));

      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

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
        <h1 className="hotelsTitle" style={{marginTop:"70px"}}>Discover unique Hotels</h1>
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
        <h1 className="trainsTitle" style={{marginTop:"70px"}}>Discover new Trains Adventures</h1>
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
    </div>
  );
};

export default Home;
