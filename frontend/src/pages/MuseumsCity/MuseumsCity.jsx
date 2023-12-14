import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./museumscity.css";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const MuseumsCity = () => {
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

    return (
        <div>
            <Navbar />
            <Header type={type} />

            <div className="museumsCityContainer">
                <h1 className="museumsCityTitle">Explore this in: <i>Prague</i></h1>
                < div className="museumsCityFeatured">
                    <div className="museumCityCard">

                        <div className="museumCityInfo">
                            <img class="musuemCityCardImg" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHcGs-2uqWhRcpFtzUlJvG_nw_Ac2FrDMRvw&usqp=CAU"
                            alt=""
                            />
                        <p>Old Town Square</p>
                        <button class="museumCityDetailsBtn" onClick={handleSearch}>View Details</button>
                        </div>
                    </div>
                    <div className="museumCityCard">

                        <div className="museumCityInfo">
                            <img class="musuemCityCardImg" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtVffXkHmjrRgZkHrDJsesjAEd_CP4n22CwQ&usqp=CAU"
                            alt=""/>
                        <p>Charles Bridge</p>
                        <button class="museumCityDetailsBtn" onClick={handleSearch}>View Details</button>
                        </div>
                    </div>
                    <div className="museumCityCard">

                        <div className="museumCityInfo">
                            <img class="musuemCityCardImg" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVmfNpBLN2kt8wHhxaGGpNN6pDQQ1rlqSpVA&usqp=CAU"
                            alt=""/>
                        <p>Prague Castle</p>
                        <button class="museumCityDetailsBtn" onClick={handleSearch}>View Details</button>
                        </div>
                    </div>
                </div>
                < div className="museumsCityFeatured">
                    <div className="museumCityCard">

                        <div className="museumCityInfo">
                            <img class="musuemCityCardImg" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC0jJmlOr4cpiWw0DXSvGH_ZrlLmzFCsr4gw&usqp=CAU"
                            alt=""/>
                        <p>Jewish Quarter</p>
                        <button class="museumCityDetailsBtn" onClick={handleSearch}>View Details</button>
                        </div>
                    </div>
                    <div className="museumCityCard">

                        <div className="museumCityInfo">
                            <img class="musuemCityCardImg" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS5Ibsjk-vwVvrODRHQO-Zf5D0G3NJlb754Q&usqp=CAU"
                            alt=""/>
                        <p>National Museum</p>
                        <button class="museumCityDetailsBtn" onClick={handleSearch}>View Details</button>
                        </div>
                    </div>
                    <div className="museumCityCard">

                        <div className="museumCityInfo">
                            <img class="musuemCityCardImg" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAxXcBaEID9zbDgI6-XjdRN8FvCtXecqmwK_nLfplzcnyilOVyVahIo69P_zYl6c3e_J0&usqp=CAU"
                            alt=""/>
                        <p>Petřín Tower and Petřín Park</p>
                        <button class="museumCityDetailsBtn" onClick={handleSearch}>View Details</button>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default MuseumsCity;




// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import CardMuseumCity from './CardMuseumCity';  

// const MuseumsCity = () => {
//   const location = useLocation();
//   const [type, setType] = useState("museumscity");

//   useEffect(() => {
//     if (location.state && location.state.headerType) {
//       setType(location.state.headerType);
//     }
//   }, [location]);

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate("/museumscitydetails");
//   };

//   const museumsData = [];

//   return (
//     <div>
//       <Navbar />
//             <Header type={type} />


//       <div className="museumsCityContainer">
//         <h1 className="museumsCityTitle">Explore this in: <i>Prague</i></h1>
//         <div className="museumsCityFeatured">
//           {museumsData.map((museum, index) => (
//             <CardMuseumCity
//               key={index}
//               imageUrl={museum.imageUrl}
//               name={museum.name}
//               onClick={handleSearch}
//             />
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default MuseumsCity;

