import React from 'react';
import {
  IoShareOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoSendOutline,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import PostComments from './PostComments';
import PostMenu from './PostMenu';

const PostSidebar = ({ match, loaded, handleLoad, postUser, currentPost, ownPost }) => {
  return (
    <div id="post__sidebar">
      <div id="post__sidebar__top">
        <Link to={`/profile/${match.params.uid}`}>
          <div id="post__profile__container">
            <div id="post__image__container">
              <div id="post__profile__img-loading" style={loaded ? { display: 'none' } : null} />
              <img
                style={!loaded ? { display: 'none' } : null}
                onLoad={handleLoad}
                id="post__profile__img"
                src={postUser?.profilePhoto}
                alt="avatar"
                className="post__loading-image"
              />
              <img
                className="blur"
                id="post__profile__img-blur"
                style={!loaded ? { display: 'none' } : null}
                src={postUser?.profilePhoto}
                alt=""
              />
            </div>
            <div id="post__name__container" style={loaded ? { display: 'none' } : null}>
              <div id="post__display-name-loading" />
              <div id="post__username-loading" />
            </div>
            <div id="post__name__container" style={!loaded ? { display: 'none' } : null}>
              <h2 id="post__display-name">{postUser?.displayName}</h2>
              <p id="post__username">@{postUser?.username}</p>
            </div>
          </div>
        </Link>
        <div className="caption-container">
          <p className="caption">{currentPost?.caption}</p>
        </div>
      </div>
      {/*//+ comments */}
      <PostComments loaded={loaded} />
      <div className="post__footer">
        <div className="first-child">
          <div className="left">
            <IoHeartOutline className="post__icon like-icon" />
            <IoChatbubbleOutline className="post__icon" />
            <IoShareOutline className="post__icon" />
          </div>
          {/* delete menu */}
          <PostMenu match={match} ownPost={ownPost} currentPost={currentPost} />
        </div>
        <p className="post__likes">{currentPost?.likesCounter} likes</p>
        <div className="comment-box">
          <form className="comment__form">
            <input className="input-box" type="text" placeholder="Add a comment..." />
          </form>
          <IoSendOutline className="send" />
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
