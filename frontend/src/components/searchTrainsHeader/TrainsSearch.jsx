import {
  faCalendarDays,
  faPerson,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Checkbox, FormControlLabel } from "@mui/material";
import dayjs from "dayjs";

import "./trainsSearch.css";

const TrainsSearch = () => {
  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(dayjs());

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);
  const handleClassChange = (event) => {
    setTrainClass(event.target.value);
    const selectedClass = event.target.value;
    setOptions((prevOptions) => ({
      ...prevOptions,
      class: selectedClass,
    }));
  };

  const [isOneWay, setIsOneWay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [selectedFromCode, setSelectedFromCode] = useState("");
  const [selectedDestinationCode, setSelectedDestinationCode] = useState("");
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);

  localStorage.setItem("isOneWayTrains", isOneWay);

  const handleOneWayChange = (event) => {
    setIsOneWay(event.target.checked);
  };

  const [trainClass, setTrainClass] = useState("economy");

  const [openOptions, setOpenOptions] = useState(false);

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
    localStorage.setItem("trainOptions", JSON.stringify(options));
  };

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  const fetchTrains = async () => {
    try {
      console.log("from code");
      const isRoundTrip = !isOneWay;

      let formattedDepartureDate = 0;
      let formattedReturnDate = 0;


      if (isRoundTrip) {
        formattedDepartureDate = formatDate(date[0].startDate);
        formattedReturnDate = formatDate(date[0].endDate);
      } else {
        formattedDepartureDate = departureDate.format("YYYY-MM-DD");

        formattedReturnDate = null;
      }

      console.log("formattedDepartureDate");
      console.log(formattedDepartureDate);
      console.log("formattedReturnDate");
      console.log(formattedReturnDate);

      const dataToSend = {
        stationCodeOrigin: selectedFromCode,
        stationCodeDestination: selectedDestinationCode,
        departureDate: formattedDepartureDate,
        returnDate: formattedReturnDate,
      }

      console.log("dataToSend");
      console.log(dataToSend);

      const response = await fetch(
        "http://localhost:8080/api/trains/searchTrain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // if (data && data.outboundTrains && data.outboundTrains.length > 0) {
      //   const destinationCode =
      //     data.outboundTrains[0].stationDestinationInfo.stationName;
      //   localStorage.setItem("trainDestination", destinationCode);
      // }

      navigate("/trains", { state: { trainsData: data } });
    } catch (error) {
      console.error("Failed to fetch trains:", error);
    }
  };

  const handleSearch = () => {
    if (from && destination) {
      fetchTrains();
    } else {
      alert("Please fill in all the fields!");
    }
  };

  const handleOriginSelect = (stationDisplay, stationCode, field) => {
    if (field === "from") {
      setFrom(stationDisplay);
      setSelectedFromCode(stationCode);
    }
    setShowDropdown(false);
  };

  const handleDestinationSelect = (stationDisplay, stationCode, field) => {
    if (field === "destination") {
      setDestination(stationDisplay);
      setSelectedDestinationCode(stationCode);
    }
    setShowDestinationDropdown(false);
  };

  const handleDestinationChange = (value, field) => {
    if (field === "destination") {
      setDestination(value);
    }

    const searchValue = value.toLowerCase();
    if (searchValue.length > 0) {
      const filtered = stations.filter(
        (station) =>
          station.stationName.toLowerCase().includes(searchValue) ||
          station.stationCode.toLowerCase().includes(searchValue) ||
          station.stationCity.toLowerCase().includes(searchValue)
      );
      setFilteredStations(filtered);
      setShowDestinationDropdown(true);
    } else {
      setShowDestinationDropdown(false);
    }
  };

  const handleOriginChange = (value, field) => {
    if (field === "from") {
      setFrom(value);
    }
    setShowDropdown(true);
    const searchValue = value.toLowerCase();
    if (searchValue.length > 0) {
      const filtered = stations.filter(
        (station) =>
          station.stationName.toLowerCase().includes(searchValue) ||
          station.stationCode.toLowerCase().includes(searchValue) ||
          station.stationCity.toLowerCase().includes(searchValue)
      );
      setFilteredStations(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    fetchYourStationsAPI().then((data) => {
      setStations(data);
    });
  }, []);

  const fetchYourStationsAPI = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/trains/stations");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching stations:", error);
      return [];
    }
  };

  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  return (
    <div className="headerTrains">
      <h1>Quickly scan all your train travels!</h1>
      <div className="containerSearch">
        <div className="headerSearch">
          <div className="headerSearchTrainsItemLeft">
            <FontAwesomeIcon icon={faTrain} className="headerIcon" />
            <input
              type="text"
              value={from}
              placeholder="From:"
              className="headerSearchInput"
              onChange={(e) =>
                handleOriginChange(e.target.value, "from")
              }
            />
            {showDropdown && (
              <div className="dropdown">
                {filteredStations.map((station) => (
                  <div
                    key={station.stationCode}
                    onClick={() =>
                      handleOriginSelect(
                        `${station.stationName} - ${station.stationCode}`,
                        station.stationCode,
                        "from"
                      )
                    }
                    className="dropdownItem"
                  >
                    {`${station.stationName} - ${station.stationCode}`}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faTrain} className="headerIcon" />
            <input
              type="text"
              value={destination}
              placeholder="To:"
              className="headerSearchInput"
              onChange={(e) =>
                handleDestinationChange(e.target.value, "destination")
              }
            />
            {showDestinationDropdown && (
              <div className="dropdown">
                {filteredStations.map((station) => (
                  <div
                    key={station.stationCode}
                    onClick={() =>
                      handleDestinationSelect(
                        `${station.stationName} - ${station.stationCode}`,
                        station.stationCode,
                        "destination"
                      )
                    }
                    className="dropdownItem"
                  >
                    {`${station.stationName} - ${station.stationCode}`}
                  </div>
                ))}
              </div>
            )}
          </div>
          {isOneWay === true && (
            <div className="headerSearchItem">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={departureDate}
                  onChange={(newValue) => {
                    setDepartureDate(newValue);
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
                    value={trainClass}
                    onChange={handleClassChange}
                    className="optionSelect"
                  >
                    <option value="2ndclass">Economy</option>
                    <option value="1stclass">First Class</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="searchDiv">
          <button className="buttonTrainsSearch" onClick={handleSearch}>
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
          label="One-way travel ?"
        />
      </div>
    </div>
  );
};

export default TrainsSearch;
