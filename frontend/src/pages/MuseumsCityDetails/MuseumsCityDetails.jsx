import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./museumcitydetails.css";
import react, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MuseumsCityDetails = () => {
    const location = useLocation();
    const museum = location.state?.museum;

    //confirmar que é assim que se adiciona a mesma imagem vinda do card do museumcity
    const imageUrl = location.state?.imageUrl;

    const coordinates = [museum.museumLatitude, museum.museumLongitude];


    // const navigate = useNavigate();
    // // const handleSearch = () => {
    //     navigate("/museumscitydetails");
    // };

    return (
        <div>
            <Navbar />
            <Header type="museums" />

            <div className="museumsCityDetailsContainer">
                <h1 className="museumsCityDetailsTitle">
                    {museum.museumLocation}: <i>{museum.museumName}</i>
                </h1>
                <div className="museumsCityDetailsFeatured">
                    <div className="museumCityDetailsCard">
                        <img
                            class="musuemCityDetailsCardImg"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS5Ibsjk-vwVvrODRHQO-Zf5D0G3NJlb754Q&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div className="museumCityDetailsCard2">
                        <h1 className="cityDescriptionTitle">What to expect?</h1>
                        <p className="cityDescription">
                            {museum.museumDescription}
                            <a style={{ color: "grey" }}>
                                {" "}
                                (Check the latest information on the official website to plan
                                your visit accurately.)
                            </a>
                        </p>
                    </div>
                </div>
                <h2 className="museumsCityDetailsTitle">Pratical Information</h2>
                <div className="museumsCityDetailsFeatured">
                    <div className="museumCityDetailsCard2">
                        <h2>Opening hours:</h2>
                        <div className="museumCityDetailsInfo">
                            <p>Monday: {museum.openingHours}</p>
                            <p>Tuesday: {museum.openingHours}</p>
                            <p>Wednesday: {museum.openingHours}</p>
                            <p>Thursday: {museum.openingHours}</p>
                            <p>Friday: {museum.openingHours}</p>
                            <p>Saturday: {museum.openingHours}</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>

                    <div className="museumCityDetailsCard2">
                        <h2>Ticket Prices:</h2>
                        <div className="museumCityDetailsInfo">
                            <p>Adult: {museum.ticketPriceAdult}€</p>
                            <p>Children up to 15 years: {museum.ticketPriceChild}€</p>
                            <p>Adult Group: {museum.ticketPriceGroup}€ </p>
                            <p>Child Group: {museum.ticketPriceGroupChild}€</p>
                        </div>
                    </div>
                </div>
                <h2 className="museumsCityDetailsTitle">Location:</h2>
                <div className="museumsCityDetailsFeatured">
                    <div className="museumCityDetailsCard2">
                        <div className="museumCityDetailsInfo2">
                            <MapContainer
                                center={coordinates}
                                zoom={10}
                                style={{ height: "400px", width: "100%" }}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={coordinates}>
                                    <Popup>
                                        {museum.museumName}, {museum.museumLocation}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MuseumsCityDetails;