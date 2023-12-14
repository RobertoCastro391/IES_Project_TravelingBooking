import React from 'react';

const CardMuseum = ({ imageUrl, title, onClick }) => {
  return (
    <div className="museumCard" onClick={onClick}>
      <img src={imageUrl} alt="" className="museumCardImg" />
      <div className="museumCardTitle">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default CardMuseum;
