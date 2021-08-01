import React, { useState, useEffect } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom';
import { IoShareOutline, IoChatbubbleOutline, IoShareSocialOutline } from 'react-icons/io5';
import { firestore } from '../../services/firebase';
import HomeCardLike from './HomeCardLike';
import HomeCardComments from './HomeCardComments';
import HomeCardImage from './HomeCardImage';
import HomeCardOverlay from './HomeCardOverlay';
import Styles from '../../styles/home/home__card.module.css';

const Card = ({ post }) => {
  const [user, setUser] = useState();
  const [likeState, setLikeState] = useState();

  const { src, userID, likes } = post.data();
  const [modal, setModal] = useState(false);
  const [type, setType] = useState();

  useEffect(() => {
    const getUser = async () => {
      const userRef = await firestore.collection('users').doc(userID).get();
      setUser(userRef.data());
      setLikeState(likes.length);
    };
    getUser();
  }, [post]);

  const getModal = (modalType) => {
    modal ? setModal(false) : setModal(true);
    setType(modalType);
  };

  return (
    <>
      {post && user ? (
        <div className={Styles.card}>
          <div className={Styles.container}>
            {modal && (
              <HomeCardOverlay getModal={getModal} userID={userID} type={type} post={post} />
            )}
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
              {/*//+ more icon */}
              <div className={Styles.right}>
                <MoreHorizIcon
                  onClick={() => {
                    getModal('follow');
                  }}
                  className={Styles.moreIcon}
                />
              </div>
            </div>
            {/*//+ image */}
            <HomeCardImage Styles={Styles} postID={post.id} userID={userID} src={src} />
            {/*//+ footer */}
            <div className={Styles.footer}>
              <div className={Styles.firstChild}>
                <div className={Styles.left}>
                  {/*//+ likes button */}
                  <HomeCardLike setLikeState={setLikeState} post={post} userID={userID} />
                  <Link className={Styles.chatLink} to={`/Post/${userID}/${post.id}`}>
                    <IoChatbubbleOutline className={Styles.icon} />
                  </Link>
                  <Link className={Styles.chatLink} to={`/Post/${userID}/${post.id}`}>
                    <IoShareOutline className={Styles.icon} />
                  </Link>
                </div>
                <IoShareSocialOutline
                  className={Styles.icon}
                  onClick={() => {
                    getModal('share');
                  }}
                />
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
