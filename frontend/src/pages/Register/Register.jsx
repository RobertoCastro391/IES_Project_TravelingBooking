import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css"; // Adjust the CSS file name as needed
import {
  faUser,
  faEnvelope,
  faLock,
  faMapMarked,
  faBuilding,
  faCity,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const userData = {
        name,
        surname,
        email,
        password, // Ensure you handle passwords securely!
        repeatPassword,
        address,
        postalCode,
        city,
        country,
        phoneNumber,
      };

      console.log(JSON.stringify(userData));

      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // Handle the response. Redirect or inform the user as needed.
      console.log("User registered successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="loginheader">
        <div className="logintexttitle">Create an account</div>
      </div>
      <div className="infoContainer">
        <div className="infoContainer1">
          <label className="register-label">Name:</label>

          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            className="register-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />

          <label className="register-label">Surname:</label>

          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            className="register-input"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Enter your surname"
            required
          />

          <label className="register-label">Email:</label>

          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="text"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label className="register-label">Password:</label>

          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <label className="register-label">Repeat Password:</label>
          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            className="register-input"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat your password"
            required
          />
        </div>
        <div className="infoContainer2">
          <label className="register-label">Address:</label>

          <FontAwesomeIcon icon={faMapMarked} />
          <input
            type="text"
            className="register-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
          <label className="register-label">Postal Code:</label>

          <FontAwesomeIcon icon={faBuilding} />
          <input
            type="text"
            className="register-input"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter your postal code"
            required
          />

          <label className="register-label">City:</label>

          <FontAwesomeIcon icon={faCity} />
          <input
            type="text"
            className="register-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            required
          />

          <label className="register-label">Country:</label>

          <FontAwesomeIcon icon={faGlobe} />
          <input
            type="text"
            className="register-input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country"
            required
          />

          <label className="register-label">Phone Number:</label>

          <FontAwesomeIcon icon={faPhone} />
          <input
            type="tel"
            className="register-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>
      <div className="register-button-container">
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
