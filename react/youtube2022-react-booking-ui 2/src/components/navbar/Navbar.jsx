import "./navbar.css"
import logo from "../images/logo2.png"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
<<<<<<< HEAD
        <img src="./images/logo.png"/>
=======
        <img src={logo} alt="Site Logo" />
>>>>>>> origin/main
        </span>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>-
    </div>
  )
}

export default Navbar