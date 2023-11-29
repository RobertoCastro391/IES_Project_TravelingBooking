import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Perform login logic here

    // For simplicity, just display an error
    setError("Invalid username or password");
  };

  return (
    <div>
      <Navbar />
      <div class="loginheader">
        <div class="logintexttitle">Log-in to your account</div>
      </div>

      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            style={{ borderRadius: "5px", border: "1px solid #ccc", height: "40px"}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" style={{ marginTop: "10px" }}>Password:</label>
          <input
            id="password"
            type="password"
            style={{ borderRadius: "5px", border: "1px solid #ccc", height: "40px"}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">Log In</button>
        </form>

        <div className="loginMessages">
          <div>
            <p>Forgot your password? Reset it now!</p>
            <button className="button">Reset it now!</button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <p>Don’t have an account? Create one now!</p>
            <button className="button">Create your account</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
