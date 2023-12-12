import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/searchHotel/Hotel";
import Flights from "./pages/searchFlights/Flights";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import FlightCheckout from "./pages/FlightCheckout/FlightCheckout";
import AddExtrasFlight from "./pages/AddExtrasFlight/AddExtrasFlight";
import HotelDetails from "./pages/hotelDetails/HotelDetails";
import Trains from "./pages/searchTrains/Trains";
import TrainCheckout from "./pages/TrainCheckout/TrainCheckout";
import Museums from "./pages/Museums/Museums";
import MuseumsCity from "./pages/MuseumsCity/MuseumsCity";
import MuseumsCityDetails from "./pages/MuseumsCityDetails/MuseumsCityDetails";
import HotelCheckout from "./pages/HotelCheckout/HotelCheckout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<Hotel/>}/>
        <Route path="/flights" element={<Flights/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/flightcheckout" element={<FlightCheckout/>}/>
        <Route path="/AddExtrasFlight" element={<AddExtrasFlight/>}/>
        <Route path="/hotelDetails" element={<HotelDetails/>}/>
        <Route path="/trains" element={<Trains/>}/>
        <Route path="/trainCheckout" element={<TrainCheckout/>}/>
        <Route path="/museums" element={<Museums/>}/>
        <Route path="/museumscity" element={<MuseumsCity/>}/>
        <Route path="/museumscitydetails" element={<MuseumsCityDetails/>}/>
        <Route path="/hotelcheckout" element={<HotelCheckout/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;