import React from 'react';
import '../../styles/profile/profile__card.css';
import { Link } from 'react-router-dom';
import { IoHeartOutline, IoChatbubbleOutline } from 'react-icons/io5';

const ProfileCard = ({ src, match, postId, likes, comments, handleLoad, loaded }) => {
  return (
    <div className="profile__card">
      <div className="profile__card__container" style={loaded ? { background: 'none' } : null}>
        <Link className="profile__card__image-link" to={`/post/${match.params.uid}/${postId}`}>
          <div
            className="profile__card__image-loading"
            style={loaded ? { display: 'none' } : null}
          />
          <img
            className="profile__card__image"
            src={src}
            alt=""
            onLoad={handleLoad}
            style={!loaded ? { display: 'none' } : null}
          />
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
      <img
        className="profile__card__image-blur blur"
        src={src}
        alt=""
        style={!loaded ? { display: 'none' } : null}
      />
    </div>
  );
};

export default ProfileCard;
