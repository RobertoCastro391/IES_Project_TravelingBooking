import React from "react";
import "./accountInfo.css";

const AccountInfo = ({ name, surname, email, address, postalCode, city }) => {
  return (
    <div className="infoContainerAccount">
      <div className="infoContainer1Account">
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            paddingLeft: "2%",
            alignItems: "center"
          }}
        >
          {name}
        </div>
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            paddingLeft: "2%",
            alignItems: "center"
          }}
        >
          {surname}
        </div>
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            paddingLeft: "2%",
            alignItems: "center"
          }}
        >
          {email}
        </div>
      </div>
      <div className="infoContainer1Account">
        <div
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "50px",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              display: "flex",
              paddingLeft: "2%",
              alignItems: "center"
            }}
          >
            {address}
          </div>
          <div
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            paddingLeft: "2%",
            alignItems: "center"
          }}
        >
          {postalCode}
        </div>

        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "50px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            paddingLeft: "2%",
            alignItems: "center"
          }}
        >
          {city}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
