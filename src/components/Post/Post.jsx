import React, { useEffect, useState } from 'react';
import { firestore } from '../../services/firebase';
import '../../styles/post/post.css';
import { Link } from 'react-router-dom';
import profilePic from '../../assets/misc/toa-heftiba-YCi4c79ZDIE-unsplash.jpg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {
  IoShareOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoSendOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

const Post = ({ match }) => {
  const [currentPost, setCurrentPost] = useState();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    getCurrentPost();
    getCurrentUser();
  }, []);

  const getCurrentPost = async () => {
    await firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .doc(match.params.postid)
      .get()
      .then((postData) => {
        if (postData.exists) {
          setCurrentPost(postData);
        }
      });
  };

  const getCurrentUser = async () => {
    const getUser = await firestore
      .collection('users')
      .doc(match.params.uid)
      .get();
    setCurrentUser(getUser);
  };

  return (
    <>
      {currentPost && currentUser ? (
        <div id="post">
          <div id="post__container">
            <img id="post__image" src={currentPost.data().src} alt="" />
            <div id="post__sidebar">
              <Link to={`/profile/${match.params.uid}`}>
                <div id="post__profile__container">
                  <div id="post__image__container">
                    <img
                      id="post__profile__img"
                      src={currentUser.data().profilePhoto}
                      alt=""
                    />
                    <img
                      id="post__profile__img-blur"
                      src={currentUser.data().profilePhoto}
                      alt=""
                    />
                  </div>
                  <div id="post__name__container">
                    <h2 id="post__display-name">
                      {currentUser.data().displayName}
                    </h2>
                    <p id="post__username">@{currentUser.data().displayName}</p>
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
                    <span className="comment-user">Sofie Smith</span> wow so
                    cool!
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
      ) : (
        <div id="post">
          <div id="post__not-found-container">
            <h3>Post Not Found</h3>
            <Link to="/">
              <button id="post__return-button">Return Home</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
