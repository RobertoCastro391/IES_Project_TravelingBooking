import "./header.css";
import FlightsSearch from "../searchFlightsHeader/FlightsSearch";
import HotelsSearch from "../searchHotelsHeader/HotelsSearch";
import TrainsSearch from "../searchTrainsHeader/TrainsSearch";
import MuseumsSearch from "../searchMuseumsHeader/MuseumsSearch";

const Header = ({ type }) => {
  return (
    <div className="header">
      <div className="headerContainer">
        {(type === "flights" || type === "home") && <FlightsSearch />}

        {type === "hotels" && <HotelsSearch />}

        {type === "trains" && <TrainsSearch />}

        {type === "museums" && <MuseumsSearch />}
      </div>
    </div>
  );
};

export default Header;
