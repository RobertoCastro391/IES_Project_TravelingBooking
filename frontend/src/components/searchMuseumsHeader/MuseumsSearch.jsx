import {
  faMuseum,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import "./museumsSearch.css";

const MuseumsSearch = ({ showSearchButton }) => {
  const [city, setCity] = useState("");
  const [museumsCity, setMuseumsCity] = useState("");

  const navigate = useNavigate();

  const fecthMuseums = async () => {
    try {

      console.log("City Name")
      console.log(city)

      const url = `${process.env.REACT_APP_API_URL}/api/museums/museumscity/${city}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Data")
      setMuseumsCity(data);
      console.log(data);

      navigate("/museumscity", {state: { museums:  data , city: city } });
    } catch (error) {
      console.error("Failed to fetch flights:", error);
    }
  };


  const handleSearch = () => {
    fecthMuseums();
    // navigate("/museumscity");
  };

  return (
    <div className="headerFlights">
      <h1>
        Quickly scan all the museums in the city you are visiting!
      </h1>

      <div className="containerSearch">
        <div className="headerSearch">
          <div className="headerSearchItemMuseums">
            <FontAwesomeIcon icon={faMuseum} className="headerIcon" />
            <input
              type="text"
              placeholder="Where are you going?: "
              className="headerSearchInput"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
          <div className="searchDiv">
            <button className="buttonMuseumsSearch" onClick={handleSearch}>
              Search
            </button>
          </div>
      </div>
    </div>
  );
};

export default MuseumsSearch;
