import React from 'react';
import '../../styles/card.css';

const Card = ({ src }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img className="card-image" src={src} alt="" />
      </div>
      <img className="card-image-blur" src={src} alt="" />
    </div>
  );
};

export default Card;
