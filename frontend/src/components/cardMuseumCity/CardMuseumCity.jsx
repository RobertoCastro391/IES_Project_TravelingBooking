// CardMuseumCity.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardMuseumCity = ({ imageUrl, museum }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/museumscitydetails", {state: { museum:  museum, imageUrl } });
    //pus o imageurl para a pagina de details ter a mesma imagem que o carda onde clicamos
  };
  
  
  return (
    <div className="museumCityCard">
      <div className="museumCityInfo">
        <img className="musuemCityCardImg" src={imageUrl} alt="" />
        <p>{museum.museumName}</p>
        <button className="museumCityDetailsBtn" onClick={handleSearch}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default CardMuseumCity;