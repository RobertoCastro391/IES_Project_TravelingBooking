import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import { faEarth, faHotel, faTrain } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Home = () => {
  const [airports, setAirports] = useState([]);
  const [airline, setAirline] = useState([]);
  const [flights, setFlights] = useState([]);
  const [type, setType] = useState("home");

  useEffect(() => {
    // Fetch data from the Flask API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/airlines");
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data");
        console.log(data);
        setAirline(data); // Update the airports state with the fetched data
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/airports");
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data");
        console.log(data);
        setAirports(data); // Update the airports state with the fetched data
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    const fetchData3 = async () => {
      try {
        const response = await fetch("http:///localhost:8080/api/flights");
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
    fetchData2();
    fetchData3();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type={type} />

      <div className="homeContainer">
        <div className="boxContainer">
          <div className="box">
            <FontAwesomeIcon icon={faTrain} />
            <p>Trains</p>
          </div>
          <div className="box">
            <FontAwesomeIcon icon={faHotel} />
            <p>Hotels</p>
          </div>
          <div className="box">
            <FontAwesomeIcon icon={faEarth} />
            <p>Explore Everywhere</p>
          </div>
        </div>
        
        <Featured />
        <h1 className="homeTitle">Discover various stays</h1>
        <PropertyList />
        <h1 className="homeTitle">Our costumers loved</h1>
        <FeaturedProperties />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
