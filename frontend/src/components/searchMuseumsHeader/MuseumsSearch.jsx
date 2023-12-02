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

const FlightsSearch = () => {
  const [from, setFrom] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/flights", { state: { from } });
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
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
        </div>
        <div className="searchDiv">
          <button className="buttonFlightsSearch" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightsSearch;
