import React, { useState, useEffect } from 'react';
import {
  IoShareOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoSendOutline,
} from 'react-icons/io5';
import { Link, useHistory } from 'react-router-dom';
import PostCommentSection from './PostCommentSection';
import PostMenu from './PostMenu';
import Styles from '../../styles/post/post__sidebar.module.css';
import Loading from '../../styles/post/post__loading.module.css';
import { firestore, storage, firestoreFieldValue } from '../../services/firebase';
import PostLikeButton from './PostLikeButton';
import PostCommentBox from './PostCommentBox';
import convertTime from '../../functions/convertTime';

const PostSidebar = ({
  match,
  loaded,
  handleLoad,
  postUser,
  currentPost,
  ownPost,
  getCurrentPost,
}) => {
  let history = useHistory();
  const [addTime, setAddTime] = useState('');

  useEffect(() => {
    if (currentPost) {
      const getCur = convertTime(currentPost.date, Date.now());
      setAddTime(getCur);
    }
  }, [currentPost]);

  return (
    <div className={Styles.sidebar}>
      <div className={Styles.top}>
        <Link to={`/profile/${match.params.uid}`}>
          <div className={Styles.profileContainer}>
            <div className={Styles.imageContainer}>
              <div
                className={Loading.profileImg + ' ' + 'gradientLoad'}
                style={loaded ? { display: 'none' } : null}
              />
              <img
                style={!loaded ? { display: 'none' } : null}
                onLoad={handleLoad}
                src={postUser?.profilePhoto}
                alt="avatar"
                className={Styles.profileImg}
              />
              <img
                className={Styles.profileImgBlur}
                style={!loaded ? { display: 'none' } : null}
                src={postUser?.profilePhoto}
                alt=""
              />
            </div>
            <div className={Styles.nameContainer} style={loaded ? { display: 'none' } : null}>
              <div className={Loading.displayName + ' ' + 'gradientLoad'} />
              <div className={Loading.username + ' ' + 'gradientLoad'} />
            </div>
            <div className={Styles.nameContainer} style={!loaded ? { display: 'none' } : null}>
              <h2 className={Styles.displayName}>{postUser?.displayName}</h2>
              <p className={Styles.username}>@{postUser?.username}</p>
            </div>
          </div>
        </Link>
        <div className={Styles.captionContainer}>
          <p className={Styles.caption}>{currentPost?.caption}</p>
        </div>
      </div>
      {/*//+ comments */}
      <PostCommentSection currentPost={currentPost} loaded={loaded} />
      <div className={Styles.footer}>
        <div className={Styles.firstChild}>
          <div className={Styles.left}>
            {/*//+ liked button */}
            <PostLikeButton
              Styles={Styles}
              match={match}
              history={history}
              IoHeartOutline={IoHeartOutline}
              firestore={firestore}
              firestoreFieldValue={firestoreFieldValue}
              getCurrentPost={getCurrentPost}
            />
            <IoChatbubbleOutline className={Styles.postIcon} />
            <IoShareOutline className={Styles.postIcon} />
          </div>
          {/*//+ delete menu */}
          <PostMenu
            storage={storage}
            firestore={firestore}
            match={match}
            ownPost={ownPost}
            currentPost={currentPost}
          />
        </div>
        <div className={Styles.infoContainer}>
          <p className={Styles.likes}>{currentPost?.likes.length} likes</p>
          <p className={Styles.time}>{addTime}</p>
        </div>
        {/*//+ comment box */}
        <PostCommentBox
          firestore={firestore}
          match={match}
          firestoreFieldValue={firestoreFieldValue}
          IoSendOutline={IoSendOutline}
          Styles={Styles}
          getCurrentPost={getCurrentPost}
        />
      </div>
    </div>
  );
};

export default PostSidebar;
