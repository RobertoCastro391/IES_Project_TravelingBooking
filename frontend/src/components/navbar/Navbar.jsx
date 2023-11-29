import "./navbar.css"
import { useNavigate } from "react-router-dom";
import logo from "../images/logo2.png"

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
          <button className="navButton" onClick={handleRegister}>Register</button>
          <button className="navButton"onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar