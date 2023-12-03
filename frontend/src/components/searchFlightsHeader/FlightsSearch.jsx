import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faPlaneArrival,
  faPlaneDeparture,
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

import "./flightsSearch.css";

const FlightsSearch = () => {
  const [from, setFrom] = useState("");

  const [destination, setDestination] = useState("");

  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);

  const [departureDate, setDepartureDate] = useState(dayjs());

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    class: "economy",
  });

  const calendarRef = useRef();

  const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    });
  };

  useOutsideClick(calendarRef, () => {
    if (openDate) setOpenDate(false);
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleClassChange = (event) => {
    setFlightClass(event.target.value);
    const selectedClass = event.target.value;
    setOptions((prevOptions) => ({
      ...prevOptions,
      class: selectedClass,
    }));
  };

  const handleSearch = () => {
    navigate("/flights", { state: { destination, date, options } });
  };

  const [isOneWay, setIsOneWay] = useState(false);
  
  const handleOneWayChange = (event) => {
    setIsOneWay(event.target.checked);
  };

  const [flightClass, setFlightClass] = useState("economy"); // Default to 'economy'

  return (
    <div className="headerFlights">
      <h1>Quickly scan all your favourite flights</h1>

      <div className="containerSearch">
        <div className="headerSearch">
          <div className="headerSearchItemLeft">
            <FontAwesomeIcon icon={faPlaneDeparture} className="headerIcon" />
            <input
              type="text"
              value={from}
              placeholder="From:"
              className="headerSearchInput"
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPlaneArrival} className="headerIcon" />
            <input
              type="text"
              placeholder="To:"
              className="headerSearchInput"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          {isOneWay === true && (
            <div className="headerSearchItem">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={departureDate}
                  onChange={(newValue) => {
                    setDepartureDate(newValue); // newValue is a Dayjs object
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </div>
          )}
          {isOneWay === false && (
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
              >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                date[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
              {openDate && (
                <div ref={calendarRef}>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>
          )}
          <div className="headerSearchItemRight">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="headerSearchText"
            >{`${options.adult} adult · ${options.children} children · ${options.class} class`}</span>
            {openOptions && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.adult <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.children <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="optionText">Class</span>
                  <select
                    value={flightClass}
                    onChange={handleClassChange}
                    className="optionSelect"
                  >
                    <option value="economy">Economy</option>
                    <option value="premium economy">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first class">First Class</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="searchDiv">
          <button className="buttonFlightsSearch" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={isOneWay}
              onChange={handleOneWayChange}
              color="primary"
              style={{ color: "white", fontWeight: "bold" }}
            />
          }
          label="One-way flight ?"
        />
      </div>
    </div>
  );
};

export default FlightsSearch;