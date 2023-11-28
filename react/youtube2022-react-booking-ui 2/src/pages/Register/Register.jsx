import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css"; // Adjust the CSS file name as needed
import { faUser, faEnvelope, faLock, faMapMarked, faBuilding, faCity, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';



const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    // Perform registration logic here

    // For simplicity, just display an error
    setError('Registration not implemented in this example');
  };

  return (
    <div>
      <Navbar />
      <div class="loginheader"> 
        <div class="logintexttitle">Create an account</div>
    </div>
      <div className="container">
        <div className="register-container">
          <div className="register-form">
            <label className="register-label">Name:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                className="register-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <label className="register-label">Surname:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                className="register-input"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Enter your surname"
              />
            </div>

            <label className="register-label">Email:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="text"
                className="register-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <label className="register-label">Email:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                className="register-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <label className="register-label">Password:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                className="register-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <label className="register-label">Repeat Password:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                className="register-input"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Repeat your password"
              />
            </div>

            <label className="register-label">Address:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faMapMarked} />
              <input
                type="text"
                className="register-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </div>

            <label className="register-label">Postal Code:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faBuilding} />
              <input
                type="text"
                className="register-input"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter your postal code"
              />
            </div>

            <label className="register-label">City:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faCity} />
              <input
                type="text"
                className="register-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
              />
            </div>

            <label className="register-label">Country:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faGlobe} />
              <input
                type="text"
                className="register-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country"
              />
            </div>

            <label className="register-label">Phone Number:</label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faPhone} />
              <input
                type="tel"
                className="register-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>


            {/* Add similar input fields for other registration details */}

            {error && <p className="register-error">{error}</p>}

            <button className="register-button" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Register;
