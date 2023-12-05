import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Login failed");
        return;
      }

      const data = await response.json();

      console.log("Login response:", data);
      localStorage.setItem("userId", data.userId);

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="loginheader">
        <div className="logintexttitle">Log-in to your account</div>
      </div>

      <div className="loginContainer">
        <div className="loginForm">
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
            id="password"
            type="password"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="buttonLogin" onClick={handleLogin}>
            Log In
          </button>
        </div>

        <div className="loginMessages">
          <div>
            <p style={{textAlign: "center"}}>Forgot your password? Reset it now!</p>
            <button className="buttonLogin">Reset it now!</button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <p style={{textAlign: "center"}}>Don’t have an account? Create one now!</p>
            <button className="buttonLogin" onClick={handleRegister}>Create your account</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
