import React, { useEffect, useState } from 'react';
import { firestore } from '../../services/firebase';
import '../../styles/post/post.css';
import '../../styles/post/post__loading.css';
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
  const [postUser, setPostUser] = useState();
  const [loading, setLoading] = useState([
    {
      image: 'avatar',
      loading: true,
    },
    { image: 'post', loading: true },
  ]);
  const [loaded, setLoaded] = useState(false);

  //@ get the current post and user on page load
  useEffect(() => {
    getCurrentPost();
    getPostUser();
  }, []);

  //@ check if postUser and currentUser are defined then set loading false
  useEffect(() => {
    if (postUser && currentPost) {
      if (loading.every((item) => item.loading === false)) {
        setLoaded(true);
        console.log(loaded);
      }
    }
  }, [loading]);

  //@ get the current post
  const getCurrentPost = async () => {
    const thisPost = await firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .doc(match.params.postid)
      .get();
    if (thisPost.exists) {
      setCurrentPost(thisPost);
    } else {
      setLoaded('error');
    }
  };

  //@ get the profile of the current post
  const getPostUser = async () => {
    const getUser = await firestore.collection('users').doc(match.params.uid).get();
    if (getUser.exists) {
      setPostUser(getUser);
    } else {
      setLoaded('error');
    }
  };

  //@ update the loading state
  const handleLoad = (e) => {
    const { alt } = e.target;
    const imgIndex = loading.findIndex((img) => img.image === alt);
    setLoading((old) => [...old], {
      [loading[imgIndex]]: (loading[imgIndex].loading = false),
    });
  };

  let postState;

  //@ if finished loading
  postState = (
    <div id="post">
      <div id="post__container">
        <div id="post__image-loading" style={loaded ? { display: 'none' } : null} />
        <img
          style={!loaded ? { display: 'none' } : null}
          onLoad={handleLoad}
          id="post__image"
          src={currentPost && currentPost.data().src}
          alt="post"
        />
        <div id="post__sidebar">
          <Link to={`/profile/${match.params.uid}`}>
            <div id="post__profile__container">
              <div id="post__image__container">
                <div id="post__profile__img-loading" style={loaded ? { display: 'none' } : null} />
                <img
                  style={!loaded ? { display: 'none' } : null}
                  onLoad={handleLoad}
                  id="post__profile__img"
                  src={postUser && postUser.data().profilePhoto}
                  alt="avatar"
                />
                <img
                  id="post__profile__img-blur"
                  style={!loaded ? { display: 'none' } : null}
                  src={postUser && postUser.data().profilePhoto}
                  alt=""
                />
              </div>
              <div id="post__name__container">
                <h2 id="post__display-name">{postUser && postUser.data().displayName}</h2>
                <p id="post__username">@{postUser && postUser.data().username}</p>
              </div>
            </div>
          </Link>
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
          <div className="post__footer">
            <div className="first-child">
              <div className="left">
                <IoHeartOutline className="post__icon like-icon" />
                <IoChatbubbleOutline className="post__icon" />
                <IoShareOutline className="post__icon" />
              </div>
              <IoShareSocialOutline className="post__icon" />
            </div>
            <p className="post__likes">{currentPost && currentPost.data().likesCounter} likes</p>
            <div className="comment-box">
              <form className="comment__form">
                <input className="input-box" type="text" placeholder="Add a comment..." />
              </form>
              <IoSendOutline className="send" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  //@ if there was an error
  if (loaded === 'error') {
    postState = (
      <div id="post">
        <div id="post__not-found-container">
          <h3>Post Not Found</h3>
          <Link to="/">
            <button id="post__return-button">Return Home</button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{postState}</>;
};

export default Post;
