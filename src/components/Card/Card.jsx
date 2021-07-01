import React from 'react';
import '../../styles/card.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {
  IoShareOutline,
  IoHeartOutline,
  IoHeart,
  IoChatbubbleOutline,
  IoSendOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

import profilePic from '../../assets/misc/toa-heftiba-YCi4c79ZDIE-unsplash.jpg';

const Card = ({ src }) => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="card-header">
          <div className="left">
            <img src={profilePic} alt="" className="card-profile-picture" />
            <div className="card-user-info">
              <p className="card-display-name">Emily Browning</p>
              <p className="card-username">@embr32</p>
            </div>
          </div>
          <div className="right">
            <MoreHorizIcon className="more-icon" />
          </div>
        </div>
        <div className="card-footer">
          <div className="first-child">
            <div className="left">
              <IoHeartOutline className="card-icon like-icon" />
              <IoChatbubbleOutline className="card-icon" />
              <IoShareOutline className="card-icon" />
            </div>
            <IoShareSocialOutline className="card-icon" />
          </div>
          <p className="card-likes">3,543 likes</p>
          <div className="card-comments">
            <p className="view-all">View All Comments</p>
            <p className="comment">
              <span className="comment-user">Andrew G</span> awesome 🔥
            </p>
            <p className="comment">
              <span className="comment-user">Sofie Smith</span> wow so cool!
            </p>
          </div>
          <div className="comment-box">
            <form className="comment-form">
              <input
                className="input-box"
                type="text"
                placeholder="Add a comment..."
              />
            </form>
            <IoSendOutline className="send" />
          </div>
        </div>
        <img className="card-image" src={src} alt="" />
      </div>
      <img className="card-image-blur" src={src} alt="" />
    </div>
  );
};

export default Card;
