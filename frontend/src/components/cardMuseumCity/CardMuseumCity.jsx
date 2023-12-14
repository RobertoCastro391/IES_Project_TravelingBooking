// CardMuseumCity.js

import React from 'react';

const CardMuseumCity = ({ imageUrl, name, onClick }) => {
  return (
    <div className="museumCityCard">
      <div className="museumCityInfo">
        <img className="musuemCityCardImg" src={imageUrl} alt="" />
        <p>{name}</p>
        <button className="museumCityDetailsBtn" onClick={onClick}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default CardMuseumCity;