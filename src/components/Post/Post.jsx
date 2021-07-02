import React from 'react';
import './styles/post.css';
import { Link } from 'react-router-dom';
import profilePic from '../../assets/misc/toa-heftiba-YCi4c79ZDIE-unsplash.jpg';
import unicorn from '../../assets/img/cards/unicorn.jpg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {
  IoShareOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoSendOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

const Post = () => {
  return (
    <div id="post">
      <div id="post-container">
        <img id="post-image" src={unicorn} alt="" />
        <div id="post-sidebar">
          <Link exact to="/profile">
            <div id="post-profile-container">
              <div id="post-image-container">
                <img id="post-profile-img" src={profilePic} alt="" />
                <img id="post-profile-img-blur" src={profilePic} alt="" />
              </div>
              <div id="post-name-container">
                <h2 id="post-display-name">Emily Browning</h2>
                <p id="post-username">@embr32</p>
              </div>
            </div>
          </Link>
          <div className="post-comments">
            {/* <p className="view-all">View All Comments</p> */}
            <div className="post-comment-container">
              <img
                className="post-comment-profile-img"
                src={profilePic}
                alt=""
              />
              <p className="comment">
                <span className="comment-user">Andrew G</span> awesome 🔥
              </p>
            </div>
            <div className="post-comment-container">
              <img
                className="post-comment-profile-img"
                src={profilePic}
                alt=""
              />
              <p className="comment">
                <span className="comment-user">Sofie Smith</span> wow so cool!
              </p>
            </div>
          </div>
          <div className="post-footer">
            <div className="first-child">
              <div className="left">
                <IoHeartOutline className="post-icon like-icon" />
                <IoChatbubbleOutline className="post-icon" />
                <IoShareOutline className="post-icon" />
              </div>
              <IoShareSocialOutline className="post-icon" />
            </div>
            <p className="post-likes">3,543 likes</p>
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
        </div>
      </div>
    </div>
  );
};

export default Post;
