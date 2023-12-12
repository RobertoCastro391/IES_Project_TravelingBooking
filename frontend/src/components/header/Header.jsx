import "./header.css";
import FlightsSearch from "../searchFlightsHeader/FlightsSearch";
import HotelsSearch from "../searchHotelsHeader/HotelsSearch";
import TrainsSearch from "../searchTrainsHeader/TrainsSearch";
import MuseumsSearch from "../searchMuseumsHeader/MuseumsSearch";
import AddExtrasFlightHeader from "../addExtrasFlightHeader/AddExtrasFlightHeader";

const Header = ({ type='home' }) => {
  return (
    <div className="header">
      <div className="headerContainer">
        {(type === "flights" || type === "home") && <FlightsSearch />}

        {type === "hotels" && <HotelsSearch />}

        {type === "trains" && <TrainsSearch />}

        {type === "museums" && <MuseumsSearch showSearchButton={true} />}

        {type === "museumscity" && <MuseumsSearch showSearchButton={false} />}

        {type === "addExtrasFLight" && <AddExtrasFlightHeader/>}
      
      </div>
    </div>
  );
};

export default Header;
