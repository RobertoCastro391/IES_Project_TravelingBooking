import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./flightcheckout.css";
import { faInfoCircle, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import CardFlights from "../../components/cardFlights/CardFlights";
// Import other necessary components and hooks

const FlightCheckout = () => {
    // State and functions to handle form submissions and state updates would go here
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(300);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [bag, setbag] = useState("");

    const flightData = [
        {
            id: 1,
            airline: "Ryanair",
            from: "Porto",
            to: "Prague",
            departure: "09:00 AM",
            arrival: "12:00 PM",
            price: 200,
            duration: "3 hours",
        },
    ];

    const filteredFlights = flightData.filter(
        (flight) => flight.price >= minPrice && flight.price <= maxPrice
    );

    const handleCheckout = () => {
        // Add logic for handling the checkout process
        console.log("Checkout logic goes here!");
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div>
            <Navbar />

            <div className="fligthcheckoutContainer" >
                <div className="columnInformations">
                    <div>
                        <p><strong>Passengers </strong><FontAwesomeIcon icon={faInfoCircle} /></p>
                        <div className='name'><label > First Name:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className='name'><label > Last Name:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter last name"
                            />
                        </div>
                        <div className='nacionalGender'>
                            {/* <div className="dropdown">
                            <button onClick={toggleDropdown}>
                                Selecione uma opção
                            </button>
                            {isOpen && (
                                <div className="dropdown-content">
                                    <p>Masculino</p>
                                    <p>Feminino</p>
                                </div>
                            )}
                        </div> */}
                            <div>
                                <label > Gender:</label>

                                <input
                                    type="text"
                                    className='placeholdernome'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your gender"
                                />
                            </div>
                            <div><label > Nacionality:</label>

                                <input
                                    type="text"
                                    className='placeholdernome'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your nacionality"
                                /></div>
                        </div>
                        <div className='nacionalGender'>
                            {/* <div className="dropdown">
                            <button onClick={toggleDropdown}>
                                Selecione uma opção
                            </button>
                            {isOpen && (
                                <div className="dropdown-content">
                                    <p>Masculino</p>
                                    <p>Feminino</p>
                                </div>
                            )}
                        </div> */}
                            <div>
                                <label > Date of Birth:</label>

                                <input
                                    type="text"
                                    className='placeholdernome'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="DD/MM/YYYY"
                                />
                            </div>
                            <div><label > Passport Number:</label>

                                <input
                                    type="text"
                                    className='placeholdernome'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="XXXXXXXXXX"
                                /></div>
                        </div>
                    </div>
                    <div >
                        <p><strong>Booking Contact</strong><FontAwesomeIcon icon={faPhone} /></p>
                        <div className='name'><label > Email:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className='name'><label > Phone Number</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter you phone number"
                            />
                        </div>
                    </div>
                    <div>
                        <p><strong>Payment Details </strong><FontAwesomeIcon icon={faInfoCircle} /></p>
                        <div className='name'><label > Name on Card:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name that appears on the card"
                            />
                        </div>
                        <div className='name'><label > Card Number:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your card number"
                            />
                        </div>
                        <div className='name'><label > Expiration Date:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className='name'><label > Security code:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div className='name'><label > Address line 1:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div className='name'><label > Address line 2:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div className='name'><label > Town/city:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div className='name'><label > Zip Code:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div className='name'><label > Country/Region:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div className='name'><label > State:</label>

                            <input
                                type="text"
                                className='placeholdernome'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>

                </div>

                <div className="columnSummary">
                    <div className="container-3">
                        {filteredFlights.map((flight) => (
                            <CardFlights key={flight.id} flight={flight} />
                        ))}
                    </div>

                    {/* Checkout Button */}
                    <button onClick={handleCheckout} className="checkout-button">
                        Checkout
                    </button>
                </div>

            </div>

            <Footer />
        </div>
    );
};


const BookingSummary = () => {
    // Component to display booking and payment summary
    return <div> {"detials"} </div>
};

export default FlightCheckout;