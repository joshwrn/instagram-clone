import React from 'react';
import profilePic from '../../assets/misc/toa-heftiba-YCi4c79ZDIE-unsplash.jpg';

const PostComments = ({ loaded }) => {
  return (
    <div className="post__comments">
      {/* <p className="view-all">View All Comments</p> */}
      {!loaded ? (
        <>
          <div className="post__comment__container">
            <div className="post__comment__profile-img-loading" />
            <div className="comment-loading"></div>
          </div>
          <div className="post__comment__container">
            <div className="post__comment__profile-img-loading" />
            <div className="comment-loading"></div>
          </div>
          <div className="post__comment__container">
            <div className="post__comment__profile-img-loading" />
            <div className="comment-loading"></div>
          </div>
        </>
      ) : (
        <div className="post__comment__container">
          <img className="post__comment__profile-img" src={profilePic} alt="" />
          <p className="comment">
            <span className="comment-user">Sofie Smith</span> wow so cool!
          </p>
        </div>
      )}
    </div>
  );
};

export default PostComments;
