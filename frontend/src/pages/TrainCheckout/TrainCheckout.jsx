import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./traincheckout.css";
import {
  faInfoCircle,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import CardTrains from "../../components/cardTrains/CardTrains";
import visa from "../../components/images/visa.png";
import mastercard from "../../components/images/master-card.png";
import card from "../../components/images/card.png";
import layer1 from "../../components/images/Layer_1.png";
import cancelation from "../../components/images/cancelation.png";
import { useNavigate } from "react-router-dom";
// Import other necessary components and hooks

const TrainCheckout = () => {
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cardExpirationDate, setCardExpirationDate] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bag, setbag] = useState("");

  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("You have suceefuly booked your train!");
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleGenderChange = (event) => {
    setSex(event.target.value);
  };

  const [train, setTrain] = useState([]);

  const trainNumber = localStorage.getItem("train");
  const url = "http://localhost:8080/api/trainCheckout/" + trainNumber;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        console.log(response);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data");
        console.log(data);
        setTrain(data); // Update the airports state with the fetched data
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };
    fetchData();
  }, []);

  const [passengers, setPassengers] = useState([
    { firstName: "", lastName: "", gender: "", dob: "", passport: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        firstName: "",
        lastName: "",
        gender: "",
        nacionality: "",
        dob: "",
        passport: "",
      },
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) {
      alert("You must have at least one passenger");
      return;
    }
    const newPassengers = [...passengers];
    newPassengers.splice(index, 1);
    setPassengers(newPassengers);
  };

  return (
    <div>
      <Navbar />
      <div className="containerCheckout">
        <div className="container1">
          <p style={{ fontSize: "25px" }}>
            Passengers
            <FontAwesomeIcon
              style={{ marginLeft: "0.5%" }}
              icon={faInfoCircle}
            />
          </p>
          <p style={{ fontWeight: "300", marginTop: "1%", color: "black" }}>
            Please enter the information about the passengers
          </p>

          {passengers.map((passenger, index) => (
            <>
              <input
                id="firstName"
                type="text"
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  height: "40px",
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                placeholder="Enter your first name"
                value={passenger.firstName}
                onChange={(e) =>
                  handleInputChange(index, "firstName", e.target.value)
                }
                required
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
                placeholder="Enter your last name"
                value={passenger.lastName}
                onChange={(e) =>
                  handleInputChange(index, "lastName", e.target.value)
                }
                required
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <select
                  value={passenger.gender}
                  onChange={(e) =>
                    handleInputChange(index, "gender", e.target.value) &&
                    handleGenderChange(e.target.value)
                  }
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    height: "44px",
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  <option>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <input
                  id="nacionality"
                  type="text"
                  style={{
                    flex: 1,
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    height: "40px",
                    width: "100%",
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  placeholder="Enter your nacionality"
                  value={passenger.nacionality}
                  onChange={(e) =>
                    handleInputChange(index, "nacionality", e.target.value)
                  }
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  id="dob"
                  type="date"
                  style={{
                    flex: 1,
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    height: "40px",
                    width: "100%",
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  placeholder="Enter your date of birth"
                  value={passenger.dob}
                  onChange={(e) =>
                    handleInputChange(index, "dob", e.target.value)
                  }
                  required
                />

                <input
                  id="passportNumber"
                  type="text"
                  style={{
                    flex: 1,
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    height: "40px",
                    width: "100%",
                    marginLeft: "100px",
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  placeholder="Enter your passport number"
                  value={passenger.passport}
                  onChange={(e) =>
                    handleInputChange(index, "passport", e.target.value)
                  }
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                  className="buttonSearchTrains"
                  onClick={addPassenger}
                  style={{ marginRight: "10px" }}
                >
                  Add More Passengers
                </button>
                <button
                  className="buttonSearchTrains"
                  style={{ backgroundColor: "red", marginLeft: "10px" }}
                  onClick={removePassenger}
                >
                  Delete Passenger
                </button>
              </div>
            </>
          ))}

          <p style={{ fontSize: "25px", marginTop: "30px" }}>Booking Contact</p>

          <input
            id="email"
            type="email"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            id="phoneNumber"
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
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <p style={{ fontSize: "25px", marginTop: "30px" }}>Payment Details</p>

          <input
            id="cardName"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter card name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
          <p style={{ fontWeight: "300", marginTop: "1%", color: "black" }}>
            Card types accepted: Visa, Mastercard
          </p>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
          >
            <img src={visa} alt="" style={{ width: "37px", height: "23px" }} />
            <img
              src={mastercard}
              alt=""
              style={{ width: "37px", height: "23px" }}
            />
          </div>
          <p
            style={{
              fontWeight: "300",
              marginTop: "1%",
              color: "black",
              fontSize: "15px",
            }}
          >
            Your card issuer may charge a fee.
          </p>
          <div
            style={{
              backgroundColor: "#C2C9CD",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <p style={{ padding: "20px", color: "black" }}>
              Card Information is fully encrypted and protected
            </p>
          </div>

          <input
            id="cardNumber"
            type="text"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "40px",
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            placeholder="Enter card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />

          <input
            id="cardExpirationDate"
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
            placeholder="Enter card expiration date"
            value={cardExpirationDate}
            onChange={(e) => setCardExpirationDate(e.target.value)}
            required
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              verticalAlign: "middle",
            }}
          >
            <input
              id="cvv"
              type="text"
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                height: "40px",
                width: "20%",
                marginBottom: "20px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              placeholder="Enter Security Code"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
            <img
              src={card}
              alt=""
              style={{ width: "90px", height: "36px", marginLeft: "4%" }}
            />
          </div>
          <input
            id="addressLine1"
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
            placeholder="Enter Address Line 1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
          <input
            id="addressLine2"
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
            placeholder="Enter Address line 2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
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
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "44px",
              marginBottom: "20px",
              width: "100%",
              fontSize: "16px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            <option>Country</option>
            <option value="portugal">Portugal</option>
            <option value="spain">Spain</option>
            <option value="france">France</option>
            <option value="germany">Germany</option>
          </select>
          <button className="buttonSearchTrains" onClick={handleCheckout}>
            Book Now
          </button>
        </div>
        <div
          className="container1"
          style={{ paddingLeft: "30px", paddingTop: "20px" }}
        >
          <div style={{ backgroundColor: "#EFF1F2", borderRadius: "8px" }}>
            <div
              style={{
                padding: "20px",
                margin: "20px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <p>Train Details</p>

              <div>
                <div style={{}}>
                  <p>
                    {train && train["airline_Code"] ? (
                      <div className="train-details">
                        <div className="train-details1">
                          <img
                            src={`https://www.trainaware.com/images/airline_logos/90p/${train["airline_Code"]["airlineICAO"]}.png`}
                            className="airlineLogo"
                            alt="Airline logo"
                          />
                          <div
                            style={{
                              flex: 20,
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                marginLeft: "1%",
                                marginRight: "2%",
                              }}
                            >
                              <p className="text">
                                {train["departureHour"].split(" ")[1]}
                              </p>
                              <p className="text">
                                {train["airport_code_origin"]}
                              </p>
                            </div>
                            <div className="div">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  paddingLeft: "5%",
                                  paddingRight: "5%",
                                  marginTop: "1%",
                                }}
                              >
                                <p className="text">
                                  {train["airline_Code"]["airlineName"]}
                                </p>
                                <p className="text">
                                  {train["duration"].split(":")[0] +
                                    "H:" +
                                    train["duration"].split(":")[1] +
                                    "M"}
                                </p>
                              </div>
                              <img
                                className="svg-layer"
                                alt="Svg layer"
                                src={layer1}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                marginLeft: "2%",
                              }}
                            >
                              <p className="text">
                                {train["arrivalHour"].split(" ")[1]}
                              </p>
                              <p className="text">
                                {train["airport_code_destination"]}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="train-details1">
                          <img
                            src={`https://www.trainaware.com/images/airline_logos/90p/${train["airline_Code"]["airlineICAO"]}.png`}
                            className="airlineLogo"
                            alt="Airline logo"
                          />
                          <div
                            style={{
                              flex: 20,
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                marginLeft: "1%",
                                marginRight: "2%",
                              }}
                            >
                              <p className="text">
                                {train["arrivalHour"].split(" ")[1]}
                              </p>
                              <p className="text">
                                {train["airport_code_destination"]}
                              </p>
                            </div>
                            <div className="div">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  paddingLeft: "5%",
                                  paddingRight: "5%",
                                  marginTop: "1%",
                                }}
                              >
                                <p className="text">
                                  {train["airline_Code"]["airlineName"]}
                                </p>
                                <p className="text">
                                  {train["duration"].split(":")[0] +
                                    "H:" +
                                    train["duration"].split(":")[1] +
                                    "M"}
                                </p>
                              </div>
                              <img
                                className="svg-layer"
                                alt="Svg layer"
                                src={layer1}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                marginLeft: "2%",
                              }}
                            >
                              <p className="text">
                                {train["departureHour"].split(" ")[1]}
                              </p>
                              <p className="text">
                                {train["airport_code_origin"]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      "Loading..."
                    )}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "2%",
                }}
              >
                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <div style={{ paddingLeft: "4%" }}>
                    <p>Outbound</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                      }}
                    >
                      <p style={{ color: "black", fontSize: "18px" }}>
                        Train Number:
                      </p>
                      <p
                        style={{
                          color: "black",
                          fontSize: "18px",
                          marginLeft: "10px",
                        }}
                      >
                        {" "}
                        {train["trainNumber"]}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                      }}
                    >
                      <p style={{ color: "black", fontSize: "18px" }}>Date:</p>
                      {train && train["trainDate"] ? (
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                            marginLeft: "10px",
                          }}
                        >
                          {train["trainDate"].split("T")[0]}
                        </p>
                      ) : (
                        <p>Loading ...</p>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                      }}
                    >
                      <p style={{ color: "black", fontSize: "18px" }}>
                        Departure Time:
                      </p>
                      {train && train["departureHour"] ? (
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                            marginLeft: "10px",
                          }}
                        >
                          {train["departureHour"].split(" ")[1]}
                        </p>
                      ) : (
                        <p>Loading ...</p>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                      }}
                    >
                      <p style={{ color: "black", fontSize: "18px" }}>
                        Arrival Time:
                      </p>
                      {train && train["arrivalHour"] ? (
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                            marginLeft: "10px",
                          }}
                        >
                          {train["arrivalHour"].split(" ")[1]}
                        </p>
                      ) : (
                        <p>Loading ...</p>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <div style={{ paddingLeft: "4%" }}>
                    <p>Outbound</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                      }}
                    >
                      <p style={{ color: "black", fontSize: "18px" }}>
                        Train Number:
                      </p>
                      <p
                        style={{
                          color: "black",
                          fontSize: "18px",
                          marginLeft: "10px",
                        }}
                      >
                        {train["trainNumber"]}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                      }}
                    >
                      <p style={{ color: "black", fontSize: "18px" }}>Date:</p>
                      {train && train["trainDate"] ? (
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                            marginLeft: "10px",
                          }}
                        >
                          {train["trainDate"].split("T")[0]}
                        </p>
                      ) : (
                        <p>Loading ...</p>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                      }}
                    >
                      <p style={{ color: "black", fontSize: "18px" }}>
                        Departure Time:
                      </p>
                      {train && train["departureHour"] ? (
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                            marginLeft: "10px",
                          }}
                        >
                          {train["departureHour"].split(" ")[1]}
                        </p>
                      ) : (
                        <p>Loading ...</p>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "10px",
                      }}
                    >
                      <p style={{ color: "black", fontSize: "18px" }}>
                        Arrival Time:
                      </p>
                      {train && train["arrivalHour"] ? (
                        <p
                          style={{
                            color: "black",
                            fontSize: "18px",
                            marginLeft: "10px",
                          }}
                        >
                          {train["arrivalHour"].split(" ")[1]}
                        </p>
                      ) : (
                        <p>Loading ...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                margin: "20px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>Train:</p>
                {train && train["price"] ? (
                  <p>{train["price"]}€</p>
                ) : (
                  <p>Loading ...</p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <p>Additional Options:</p>
                {train && train["price"] ? (
                  <p>{train["price"]}€</p>
                ) : (
                  <p>Loading ...</p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  borderTop: "1px solid black",
                }}
              >
                <p style={{ marginTop: "10px" }}>Total</p>
                {train && train["price"] ? (
                  <p style={{ marginTop: "10px" }}>{train["price"] * 2}€</p>
                ) : (
                  <p>Loading ...</p>
                )}
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                margin: "20px",
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                <img
                  src={cancelation}
                  style={{ width: "24px", height: "24px" }}
                  alt="cancelationIcon"
                />
                <p
                  style={{
                    color: "black",
                    marginLeft: "15px",
                    marginTop: "-3px",
                  }}
                >
                  Free cancellation
                </p>
              </div>
              {train["trainDate"] ? (
                <p
                  style={{
                    marginTop: "10px",
                    color: "black",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Free cancellation before 11:59 PM on{" "}
                  {(() => {
                    const trainDate = new Date(train["trainDate"]);
                    trainDate.setDate(trainDate.getDate() - 1); // Subtract one day
                    return trainDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
                  })()}{" "}
                  (local time of hotel). After that, you'll be charged 100% of
                  the cost.
                </p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrainCheckout;
