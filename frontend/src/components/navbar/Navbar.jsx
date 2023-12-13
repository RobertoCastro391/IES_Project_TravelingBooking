import "./navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo2.png";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const handleHome = (headerType = "home") => {
    navigate("/", { state: { headerType: headerType } });
  };

  const handleMuseums = (headerType = "home") => {
    navigate("/museums", { state: { headerType: headerType } });
  };

  const handleAccount = (userID = localStorage.getItem("userId")) => {
    navigate("/account", { state: { userID: userID } });
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <a onClick={() => handleHome()}>
            <img src={logo} alt="Site Logo" />
          </a>
        </span>

        <div className="navItems">
          {isLoggedIn ? (
            <div>
              <a onClick={() => handleHome("flights")}>Help</a>
              <a onClick={() => handleHome("flights")}>Flights</a>
              <a onClick={() => handleHome("hotels")}>Hotels</a>
              <a onClick={() => handleHome("trains")}>Trains</a>
              <a onClick={() => handleMuseums("museums")}>Museums</a>
              <a onClick={() => handleHome("hotels")}>News and Delays</a>
              <a onClick={() => handleAccount("account")}>Profile</a>
              <button className="navButton" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <div style={{ marginRight: "50px" }}>
                <a onClick={() => handleHome("flights")}>Help</a>
                <a onClick={() => handleHome("flights")}>Flights</a>
                <a onClick={() => handleHome("hotels")}>Hotels</a>
                <a onClick={() => handleHome("trains")}>Trains</a>
                <a onClick={() => handleMuseums("museums")}>Museums</a>
                <a onClick={() => handleHome("hotels")}>News and Delays</a>
              </div>
              <div>
                <button className="navButton" onClick={handleLogin}>
                  Login
                </button>
                <button className="navButton" onClick={handleRegister}>
                  Register
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
