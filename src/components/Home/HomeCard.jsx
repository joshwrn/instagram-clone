import React from 'react';
import '../../styles/home/home__card.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom';
import {
  IoShareOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoSendOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

import profilePic from '../../assets/misc/toa-heftiba-YCi4c79ZDIE-unsplash.jpg';

const Card = ({ src }) => {
  return (
    <div className="card">
      <div className="card__container">
        <div className="card__header">
          <div className="left">
            <img src={profilePic} alt="" className="card__profile-picture" />
            <div className="card__user-info">
              <p className="card__display-name">Emily Browning</p>
              <p className="card__username">@embr32</p>
            </div>
          </div>
          <div className="right">
            <MoreHorizIcon className="more-icon" />
          </div>
        </div>
        <div className="card__footer">
          <div className="first-child">
            <div className="left">
              <IoHeartOutline className="card__icon like-icon" />
              <IoChatbubbleOutline className="card__icon" />
              <IoShareOutline className="card__icon" />
            </div>
            <IoShareSocialOutline className="card__icon" />
          </div>
          <p className="card__likes">3,543 likes</p>
          <div className="card__comments">
            <p className="view-all">View All Comments</p>
            <p className="comment">
              <span className="comment__user">Andrew G</span> awesome 🔥
            </p>
            <p className="comment">
              <span className="comment__user">Sofie Smith</span> wow so cool!
            </p>
          </div>
          <div className="comment-box">
            <form className="comment__form">
              <input className="input-box" type="text" placeholder="Add a comment..." />
            </form>
            <IoSendOutline className="send" />
          </div>
        </div>
        <Link className="card__image-link" to="/Post">
          <img className="card__image" src={src} alt="" />
        </Link>
      </div>
      <img className="card__image-blur blur" src={src} alt="" />
    </div>
  );
};

export default Card;
