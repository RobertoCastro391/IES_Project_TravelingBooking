import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./museums.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// const Museums = () => {
//     const location = useLocation();
//     const [type, setType] = useState("museums");

//     useEffect(() => {
//         if (location.state && location.state.headerType) {
//             setType(location.state.headerType);
//         }
//     }, [location]);

//     const navigate = useNavigate();

//     const handleSearch = () => {
//         navigate("/museumscity");
//     };

//     return (
//         <div>
//             <Navbar />
//             <Header type={type} />

//             <div className="museumsContainer">

//                 <h1 className="museumsTitle">Discover unique places</h1>

//                 <div className="museumsFeatured">
//                     <div className="museumCard" onClick={handleSearch}>
//                         <img
//                             src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
//                             alt=""
//                             className="museumCardImg"
//                         />
//                         <div className="museumCardTitle">
//                             <h1>Dublin</h1>
//                         </div>
//                     </div>

//                     <div className="museumCard" onClick={handleSearch}>
//                         <img
//                             src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
//                             alt=""
//                             className="museumCardImg"
//                         />
//                         <div className="museumCardTitle">
//                             <h1>Reno</h1>
//                         </div>
//                     </div>

//                     <div className="museumCard" onClick={handleSearch}>
//                         <img
//                             src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
//                             alt=""
//                             className="museumCardImg"
//                         />
//                         <div className="museumCardTitle">
//                             <h1>Austin</h1>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="museumsFeatured">
//                     <div className="museumCard" onClick={handleSearch}>
//                         <img
//                             src="https://img.freepik.com/fotos-gratis/praga-a-noite_268835-845.jpg?size=626&ext=jpg&ga=GA1.1.1490980451.1701944128&semt=sph"
//                             alt=""
//                             className="museumCardImg"
//                         />
//                         <div className="museumCardTitle">
//                             <h1>Prague</h1>
//                         </div>
//                     </div>

//                     <div className="museumCard" onClick={handleSearch}>
//                         <img
//                             src="https://img.freepik.com/fotos-gratis/palacio-da-comunicacao-no-crepusculo-do-verao-madrid_1398-2169.jpg?size=626&ext=jpg&ga=GA1.1.1490980451.1701944128&semt=sph"
//                             alt=""
//                             className="museumCardImg"
//                         />
//                         <div className="museumCardTitle">
//                             <h1>Madrid</h1>
//                         </div>
//                     </div>
//                     <div className="museumCard" onClick={handleSearch}>
//                         <img
//                             src="https://img.freepik.com/fotos-premium/rio-douro-e-ponte-dom-luis-porto-portugal_218319-1117.jpg?size=626&ext=jpg&ga=GA1.1.1490980451.1701944128&semt=sph"
//                             alt=""
//                             className="museumCardImg"
//                         />
//                         <div className="museumCardTitle">
//                             <h1>Lisbon</h1>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="museumsFeatured">
//                     <div className="museumCard" onClick={handleSearch}>
//                         <img
//                             src="https://img.freepik.com/fotos-gratis/big-ben-e-westminster-bridge-ao-por-do-sol-londres-reino-unido_268835-1395.jpg?size=626&ext=jpg&ga=GA1.1.1490980451.1701944128&semt=sph"
//                             alt=""
//                             className="museumCardImg"
//                         />
//                         <div className="museumCardTitle">
//                             <h1>London</h1>
//                         </div>
//                     </div>

//                     <div className="museumCard" onClick={handleSearch}>
//                         <img
//                             src="https://img.freepik.com/fotos-gratis/uma-vista-do-por-do-sol-da-torre-eiffel-de-paris_188544-23753.jpg?size=626&ext=jpg&ga=GA1.1.1490980451.1701944128&semt=sph"
//                             alt=""
//                             className="museumCardImg"
//                         />
//                         <div className="museumCardTitle">
//                             <h1>Paris</h1>
//                         </div>
//                     </div>
//                     <div className="museumCard" onClick={handleSearch}>
//                         <img
//                             src="https://img.freepik.com/fotos-premium/gondola-tradicional-perto-do-mundialmente-famoso-canal-grande-e-ponte-rialto_536604-4360.jpg?size=626&ext=jpg&ga=GA1.1.1490980451.1701944128&semt=sph"
//                             alt=""
//                             className="museumCardImg"
//                         />
//                         <div className="museumCardTitle">
//                             <h1>Venice</h1>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Museums;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import CardMuseum from "../../components/cardMuseums/CardMuseums"; // Importe o novo componente

const Museums = () => {
  const [museumsData, setMuseumsData] = useState([]);
  const [type, setType] = useState("museums");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch data from the API
    fetch(`${process.env.REACT_APP_API_URL}/api/museums/museums`)
      .then((response) => response.json())
      .then((data) => setMuseumsData(data))
      .catch((error) => console.error("Error fetching data:", error));

    if (location.state && location.state.headerType) {
      setType(location.state.headerType);
    }
  }, [location]);

  const cardsPerRow = 3;

  // Create an array of arrays, each containing three cards
  const rows = [];
  for (let i = 0; i < 12; i += cardsPerRow) {
    rows.push(museumsData.slice(i, i + cardsPerRow));
  }

  console.log("OKKKKKK00");
  console.log(museumsData);
  return (
    <div>
      <Navbar />
      <Header type={type} />

      <div className="museumsContainer">
        <h1 className="museumsTitle">Discover unique places</h1>

        {rows.map((row, rowIndex) => (
          <div className="museumsFeatured">
            {row.map((museum, cardIndex) => (
              <CardMuseum
                key={cardIndex}
                imageUrl={museum.imageUrl}
                museum={museum}
              />
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Museums;
