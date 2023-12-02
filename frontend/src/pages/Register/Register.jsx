import React, { useState } from "react";
import "./Register.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [passportNumber, setPassportNumber] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordRepeated, setUserPasswordRepeated] = useState("");
  const [locality, setLocality] = useState(null);
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [cardNumber, setCardNumber] = useState(null);
  const [cardPIN, setCardPIN] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      if (userPassword !== userPasswordRepeated) {
        alert("Passwords do not match");
        throw new Error("Passwords do not match");
      }

      const userData = {
        firstName,
        lastName,
        sex,
        birthDate,
        passportNumber,
        nationality,
        email,
        userPassword,
        locality,
        streetAddress,
        postalCode,
        city,
        country,
        cardNumber,
        cardPIN,
        phoneNumber,
      };

      console.log(JSON.stringify(userData));

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
      <form>
        <div className="infoContainerRegister">
          <div className="infoContainer1Register">
            <input
              id="firstName"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required="required"
            />
            <input
              id="lastName"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter surname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <input
              id="email"
              type="email"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              id="userPassword"
              type="password"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
            <input
              id="userPasswordRepeated"
              type="password"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Repeat password"
              value={userPasswordRepeated}
              onChange={(e) => setUserPasswordRepeated(e.target.value)}
              required
            />
          </div>

          <div className="infoContainer1Register">
            <input
              id="streetAddress"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter Address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
            <input
              id="streetAddress2"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter Address 2"
              value={streetAddress2}
              onChange={(e) => setStreetAddress2(e.target.value)}
            />
            <input
              id="postalCode"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
            <input
              id="city"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              id="country"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "100%",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <div className="register-button-container">
              <button className="register-button" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
