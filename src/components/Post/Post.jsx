import React from 'react';
import '../../styles/post/post.css';
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
      <div id="post__container">
        <img id="post__image" src={unicorn} alt="" />
        <div id="post__sidebar">
          <Link exact to="/profile">
            <div id="post__profile__container">
              <div id="post__image__container">
                <img id="post__profile__img" src={profilePic} alt="" />
                <img id="post__profile__img-blur" src={profilePic} alt="" />
              </div>
              <div id="post__name__container">
                <h2 id="post__display-name">Emily Browning</h2>
                <p id="post__username">@embr32</p>
              </div>
            </div>
          </Link>
          <div className="post__comments">
            {/* <p className="view-all">View All Comments</p> */}
            <div className="post__comment__container">
              <img
                className="post__comment__profile-img"
                src={profilePic}
                alt=""
              />
              <p className="comment">
                <span className="comment-user">Andrew G</span> awesome 🔥
              </p>
            </div>
            <div className="post__comment__container">
              <img
                className="post__comment__profile-img"
                src={profilePic}
                alt=""
              />
              <p className="comment">
                <span className="comment-user">Sofie Smith</span> wow so cool!
              </p>
            </div>
          </div>
          <div className="post__footer">
            <div className="first-child">
              <div className="left">
                <IoHeartOutline className="post__icon like-icon" />
                <IoChatbubbleOutline className="post__icon" />
                <IoShareOutline className="post__icon" />
              </div>
              <IoShareSocialOutline className="post__icon" />
            </div>
            <p className="post__likes">3,543 likes</p>
            <div className="comment-box">
              <form className="comment__form">
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
