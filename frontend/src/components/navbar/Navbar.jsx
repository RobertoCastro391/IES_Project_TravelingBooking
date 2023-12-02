import "./navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo2.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <a onClick={handleHome}>
            <img src={logo} alt="Site Logo" />
          </a>
        </span>
        <div className="navItems">
          <div style={{marginRight: '50px'}}>
            <a onClick={handleHome}>Help</a>
            <a onClick={handleHome}>Flights</a>
            <a onClick={handleHome}>Hotels</a>
            <a onClick={handleHome}>Trains</a>
            <a onClick={handleHome}>Museunms</a>
            <a onClick={handleHome}>News and Delays</a>
          </div>
          <div>
            <button className="navButton" onClick={handleLogin}>
              Login
            </button>
            <button className="navButton" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
