import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Flights from "./pages/searchFlights/Flights";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import FlightCheckout from "./pages/FlightCheckout/FlightCheckout";
import AddExtrasFlight from "./pages/AddExtrasFlight/AddExtrasFlight";
import Museums from "./pages/Museums/Museums";
import MuseumsCity from "./pages/MuseumsCity/MuseumsCity";
import MuseumsCityDetails from "./pages/MuseumsCityDetails/MuseumsCityDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/flights" element={<Flights/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/flightcheckout" element={<FlightCheckout/>}/>
        <Route path="/AddExtrasFlight" element={<AddExtrasFlight/>}/>
        <Route path="/museums" element={<Museums/>}/>
        <Route path="/museumscity" element={<MuseumsCity/>}/>
        <Route path="/museumscitydetails" element={<MuseumsCityDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
