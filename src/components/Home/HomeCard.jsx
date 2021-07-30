import React, { useState, useEffect } from 'react';
import Styles from '../../styles/home/home__card.module.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom';
import { IoShareOutline, IoChatbubbleOutline, IoShareSocialOutline } from 'react-icons/io5';
import { firestore } from '../../services/firebase';
import HomeCardLike from './HomeCardLike';
import HomeCardComments from './HomeCardComments';
import HomeCardImage from './HomeCardImage';

const Card = ({ post }) => {
  const [user, setUser] = useState();
  const [likeState, setLikeState] = useState();
  const { src, userID, likes } = post.data();

  useEffect(async () => {
    const userRef = await firestore.collection('users').doc(userID).get();
    setUser(userRef.data());
    setLikeState(likes.length);
  }, [post]);

  const handleShare = () => {
    copyToClipboard(`${window.location.host}/post/${userID}/${post.id}`);
  };

  const copyToClipboard = (content) => {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <>
      {post && user ? (
        <div className={Styles.card}>
          <div className={Styles.container}>
            {/*//+ header */}
            <div className={Styles.header}>
              <Link to={`/profile/${userID}`}>
                <div className={Styles.left}>
                  <img src={user.profilePhoto} alt="" className={Styles.avatar} />
                  <div className={Styles.userInfo}>
                    <p className={Styles.displayName}>{user.displayName}</p>
                    <p className={Styles.username}>@{user.username}</p>
                  </div>
                </div>
              </Link>
              <div className={Styles.right}>
                <MoreHorizIcon className={Styles.moreIcon} />
              </div>
            </div>
            {/*//+ image */}
            <HomeCardImage Styles={Styles} postID={post.id} userID={userID} src={src} />
            {/*//+ footer */}
            <div className={Styles.footer}>
              <div className={Styles.firstChild}>
                <div className={Styles.left}>
                  {/*//! likes button */}
                  <HomeCardLike setLikeState={setLikeState} post={post} userID={userID} />
                  <IoChatbubbleOutline className={Styles.icon} />
                  <IoShareOutline className={Styles.icon} />
                </div>
                <IoShareSocialOutline className={Styles.icon} onClick={handleShare} />
              </div>
              <Link className={Styles.imageLink} to={`/Post/${userID}/${post.id}`}>
                <p className={Styles.likes}>{likeState} likes</p>
              </Link>
              {/*//+ comment section */}
              <HomeCardComments Styles={Styles} userID={userID} post={post} />
            </div>
          </div>
          <img className={Styles.imageBlur + ' ' + 'blur'} src={src} alt="" />
        </div>
      ) : null}
    </>
  );
};

export default Card;
