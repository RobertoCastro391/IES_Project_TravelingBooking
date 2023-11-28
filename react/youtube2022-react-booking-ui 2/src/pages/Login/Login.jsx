import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./Login.css";
import { faEarth, faHotel, faTrain } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Perform login logic here

    // For simplicity, just display an error
    setError('Invalid username or password');
  };

  return (
    <div>
      <Navbar />
      <div class="loginheader">
        <div class="logintexttitle">Log-in to your account</div>
      </div>
      
        <div className="form">
          <label className="label">Username:</label>
          <input
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />

          <label className="label">Password:</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        {error && <p className="error">{error}</p>}

        <button className="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
