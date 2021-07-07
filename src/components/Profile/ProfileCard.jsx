import React from 'react';
import '../../styles/profile/profile__card.css';
import { Link } from 'react-router-dom';
import {
  IoShareOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoSendOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

const ProfileCard = ({ src, match, postId, likes, comments }) => {
  return (
    <div className="profile__card">
      <div className="profile__card__container">
        <Link className="profile__card__image-link" to={`/post/${match.params.uid}/${postId}`}>
          <img className="profile__card__image" src={src} alt="" />
          <div className="profile__card__overlay">
            <div className="profile__card__overlay__col">
              <IoHeartOutline /> <p>{likes}</p>
            </div>
            <div className="profile__card__overlay__col">
              <IoChatbubbleOutline />
              <p>{comments}</p>
            </div>
          </div>
        </Link>
      </div>
      <img className="profile__card__image-blur" src={src} alt="" />
    </div>
  );
};

export default ProfileCard;
