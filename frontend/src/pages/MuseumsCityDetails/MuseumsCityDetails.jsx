import { colors } from "@mui/material";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
// import MapComponent from '../../components/mapcomponent/MapComponent';
import PropertyList from "../../components/propertyList/PropertyList";
import "./museumcitydetails.css";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const MuseumsCityDetails = () => {
    const location = useLocation();
    const [type, setType] = useState("museumscity");

    useEffect(() => {
        if (location.state && location.state.headerType) {
            setType(location.state.headerType);
        }
    }, [location]);


    const navigate = useNavigate();

    const handleSearch = () => {
        navigate("/museumscitydetails");
    };

    // tentar fazer um mapa
    const coordinates = [51.505, -0.09]; // Replace with your desired coordinates
    const zoom = 13;

    return (
        <div>
            <Navbar />

            <div className="museumsCityDetailsContainer">
                <h1 className="museumsCityDetailsTitle">Prague: <i>National Museum</i></h1>
                < div className="museumsCityDetailsFeatured">
                    <div className="museumCityDetailsCard">
                        <img class="musuemCityDetailsCardImg"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS5Ibsjk-vwVvrODRHQO-Zf5D0G3NJlb754Q&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <div className="museumCityDetailsCard2">
                        <h1 className="cityDescriptionTitle">What to expect?</h1>
                        <p className="cityDescription">
                            The National Museum (Národní muzeum) in Prague is a comprehensive cultural institution housing significant collections in the areas of natural history, history, art, and music.
                            Situated in Wenceslas Square, the museum is a striking architectural landmark and an essential source for understanding the rich Czech heritage.
                            <a style={{ color: "grey" }}> (Check the latest information on the official website to plan your visit accurately.)</a>
                        </p>
                    </div>
                </div>
                <h2 className="museumsCityDetailsTitle">Pratical Information</h2>
                < div className="museumsCityDetailsFeatured">

                    <div className="museumCityDetailsCard2">
                        <h2>Opening hours:</h2>
                        <div className="museumCityDetailsInfo">
                            <p>Monday:  10:00 - 18:00   </p>
                            <p>Tuesday:  10:00 - 18:00  </p>
                            <p>Wednesday:  10:00 - 18:00</p>
                            <p>Thursday:  10:00 - 18:00 </p>
                            <p>Friday:  10:00 - 18:00   </p>
                            <p>Saturday:  10:00 - 18:00 </p>
                            <p>Sunday:  10:00 - 18:00   </p>
                        </div>
                    </div>

                    <div className="museumCityDetailsCard2">
                        <h2>Ticket Prices:</h2>
                        <div className="museumCityDetailsInfo">
                            <p>Adult: 280 CZK ≈ 10.90€</p>
                            <p>Reduced: 180 CZK ≈ 7.00€                     </p>
                            <p>Children up to 15 years: FREE ADMISSION          </p>
                            <p>School excursions up to 15 years: FREE ADMISSION </p>
                            <p>School excursions 15–26 years: 40 CZK ≈ 1.55€ </p>
                        </div>
                    </div>
                </div>
                <h2 className="museumsCityDetailsTitle">Location:</h2>
                < div className="museumsCityDetailsFeatured">
                    <div className="museumCityDetailsCard2">

                        <div className="museumCityDetailsInfo2">
                            {/* <div style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}>
                                <h1>React Map Example</h1>
                                <MapComponent coordinates={coordinates} zoom={zoom} />
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default MuseumsCityDetails;





// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const MuseumsCityDetails = () => {
//     const location = useLocation();
//     const [type, setType] = useState("museumscity");
//     const [museumDetails, setMuseumDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (location.state && location.state.headerType) {
//             setType(location.state.headerType);
//         }

//         const fetchMuseumDetails = async () => {
//             try {
//                 const response = await fetch('/museumscitydetails/{museumName}');
//                 const data = await response.json();
//                 setMuseumDetails(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching museum details:', error);
//                 setLoading(false);
//             }
//         };

//         fetchMuseumDetails();
//     }, [location]);

//     const handleSearch = () => {
//         navigate("/museumscitydetails");
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <Navbar />

//             <div className="museumsCityDetailsContainer">
//                 <h1 className="museumsCityDetailsTitle">
//                     Prague: <i>{museumDetails.name}</i>
//                 </h1>
//                 <div className="museumsCityDetailsFeatured">
//                     <div className="museumCityDetailsCard">
//                         <img class="musuemCityDetailsCardImg"
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS5Ibsjk-vwVvrODRHQO-Zf5D0G3NJlb754Q&usqp=CAU"
//                             alt=""
//                         />
//                     </div>
//                     <div className="museumCityDetailsCard2">
//                         <h1 className="cityDescriptionTitle">What to expect?</h1>
//                         <p className="cityDescription">
//                             The National Museum (Národní muzeum) in Prague is a comprehensive cultural institution housing significant collections in the areas of natural history, history, art, and music.
//                             Situated in Wenceslas Square, the museum is a striking architectural landmark and an essential source for understanding the rich Czech heritage.
//                             <a style={{ color: "grey" }}> (Check the latest information on the official website to plan your visit accurately.)</a>
//                         </p>
//                     </div>
//                 </div>
//                 <h2 className="museumsCityDetailsTitle">Practical Information</h2>
//                 <div className="museumsCityDetailsFeatured">
//                     <div className="museumCityDetailsCard2">
//                         <h2>Opening hours:</h2>
//                         <div className="museumCityDetailsInfo">
//                             {museumDetails.openingHours.map((hour, index) => (
//                                 <p key={index}>{hour}</p>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="museumCityDetailsCard2">
//                         <h2>Ticket Prices:</h2>
//                         <div className="museumCityDetailsInfo">
//                             {museumDetails.ticketPrices.map((price, index) => (
//                                 <p key={index}>{price}</p>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 <h2 className="museumsCityDetailsTitle">Location:</h2>
//                 <div className="museumsCityDetailsFeatured">
//                     <div className="museumCityDetailsCard2">
//                         <div className="museumCityDetailsInfo2">
//                             {/* <div style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}>
//                                 <h1>React Map Example</h1>
//                                 <MapComponent coordinates={coordinates} zoom={zoom} />
//                             </div> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer/>
//         </div>
//     );
// };

// export default MuseumsCityDetails;
