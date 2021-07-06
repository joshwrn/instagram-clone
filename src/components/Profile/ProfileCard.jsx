import React from 'react';
import '../../styles/profile/profile__card.css';
import { Link } from 'react-router-dom';

const ProfileCard = ({ src, match, postId }) => {
  return (
    <div className="profile__card">
      <div className="profile__card__container">
        <Link className="profile__card__image-link" to={`/post/${match.params.uid}/${postId}`}>
          <img className="profile__card__image" src={src} alt="" />{' '}
        </Link>
      </div>
      <img className="profile__card__image-blur" src={src} alt="" />
    </div>
  );
};

export default ProfileCard;
