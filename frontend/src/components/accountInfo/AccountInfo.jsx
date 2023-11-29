import React from "react";
import "./accountInfo.css";


const AccountInfo = ({ name, surname, email, address, postalCode, city }) => {
  return (
    <div className="infoContainer">
      <div className="infoContainer1">
        <input
          id="name"
          type="text"
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          value={name}
        />
        <input
          id="surname"
          type="text"
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          value={surname}
        />
        <input
          id="email"
          type="email"
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          value={email}
        />
      </div>
      <div className="infoContainer2">
        <input
          id="address"
          type="text"
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          value={address}
        />
        <input
          id="postalCode"
          type="text"
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          value={postalCode}
        />

        <input
          id="city"
          type="text"
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          value={city}
        />
      </div>
    </div>
  );
}

export default AccountInfo;