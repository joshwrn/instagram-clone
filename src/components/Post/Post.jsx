import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../services/firebase';
import Styles from '../../styles/post/post.module.css';
import Loading from '../../styles/post/post__loading.module.css';
import PostSidebar from './PostSidebar';
import { useAuth } from '../../contexts/AuthContext';
import ScrollToTop from '../../functions/ScrollToTop';

const Post = ({ match }) => {
  const [currentPost, setCurrentPost] = useState();
  const [postUser, setPostUser] = useState();
  const [ownPost, setOwnPost] = useState(false);
  const [loading, setLoading] = useState([
    { image: 'avatar', loading: true },
    { image: 'post', loading: true },
  ]);
  const [loaded, setLoaded] = useState(false);
  const { currentUser, userProfile } = useAuth();

  //+ determine if this is the user's post
  useEffect(() => {
    if (currentUser && match.params.uid === currentUser.uid) {
      setOwnPost(true);
    }
  }, [postUser]);

  //+ get the current post
  const getCurrentPost = async () => {
    const thisPost = await firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .doc(match.params.postid)
      .get();
    if (thisPost.exists) {
      setCurrentPost(thisPost.data());
    } else {
      setLoaded('error');
    }
  };

  //+ get the profile of the current post
  const getPostUser = async () => {
    const getUser = await firestore.collection('users').doc(match.params.uid).get();
    if (getUser.exists) {
      setPostUser(getUser.data());
    } else {
      setLoaded('error');
    }
  };

  //+ get the current post and user on page load
  useEffect(() => {
    getCurrentPost();
    getPostUser();
  }, [match]);

  //+ check if postUser and currentUser are defined then set loading false
  useEffect(() => {
    if (postUser && currentPost) {
      if (loading.every((item) => item.loading === false)) {
        setLoaded(true);
      }
    }
  }, [loading]);

  //+ update the loading state
  const handleLoad = (e) => {
    const { alt } = e.target;
    const imgIndex = loading.findIndex((img) => img.image === alt);
    setLoading((prev) => [...prev], {
      [loading[imgIndex]]: (loading[imgIndex].loading = false),
    });
  };

  let postState;

  //+ if finished loading
  postState = (
    <div className={Styles.post}>
      <ScrollToTop />
      <div className={Styles.container}>
        <div
          className={Loading.image + ' ' + 'gradientLoad'}
          style={loaded ? { display: 'none' } : null}
        />
        <img
          style={!loaded ? { display: 'none' } : null}
          onLoad={handleLoad}
          src={currentPost?.src}
          alt="post"
          className={Styles.image}
        />
        <PostSidebar
          match={match}
          loaded={loaded}
          handleLoad={handleLoad}
          postUser={postUser}
          ownPost={ownPost}
          currentPost={currentPost}
          currentUser={currentUser}
          userProfile={userProfile}
          getCurrentPost={getCurrentPost}
        />
      </div>
    </div>
  );

  //+ if there was an error
  if (loaded === 'error') {
    postState = (
      <div className={Styles.post}>
        <div className={Styles.notFoundContainer}>
          <h3>Post Not Found</h3>
          <Link to="/">
            <button className={Styles.returnButton}>Return Home</button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{postState}</>;
};

export default Post;
