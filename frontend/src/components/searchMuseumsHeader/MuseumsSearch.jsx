import {
  faBed,
  faCalendarDays,
  faPerson,
  faMuseum,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Checkbox, FormControlLabel } from "@mui/material";
import dayjs from "dayjs";

import "./museumsSearch.css";

const MuseumsSearch = ({ showSearchButton }) => {
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const fecthMuseums = async () => {
    try {

      console.log("City Name")
      console.log(city)


      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/museums`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          museumLocation: city
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data  > 0) {
        const museumLocation = data.museumLocation;
        localStorage.setItem("museumsCity", museumLocation);
      }

      navigate("/museumscity/${city}");
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
        {showSearchButton && (
          <div className="searchDiv">
            <button className="buttonMuseumsSearch" onClick={handleSearch}>
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuseumsSearch;
