import React from 'react';
import './styles/profile-card.css';
import { Link } from 'react-router-dom';

const ProfileCard = ({ src }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-container">
        <Link className="card-image-link" to="/Post">
          <img className="profile-card-image" src={src} alt="" />{' '}
        </Link>
      </div>
      <img className="profile-card-image-blur" src={src} alt="" />
    </div>
  );
};

export default ProfileCard;
