import React from 'react';
import { Link } from 'react-router-dom';
import { IoHeartOutline, IoChatbubbleOutline } from 'react-icons/io5';
import Styles from '../../styles/profile/profile__card.module.css';
import ImageLoader from '../reusable/ImageLoader';

const ProfileCard = ({ src, match, postId, likes, comments }) => {
  return (
    <div className={Styles.card}>
      <div className={Styles.container}>
        <Link className={Styles.link} to={`/post/${match.params.uid}/${postId}`}>
          <div className={Styles.overlay}>
            <div className={Styles.icon}>
              <IoHeartOutline /> <p>{likes.length}</p>
            </div>
            <div className={Styles.icon}>
              <IoChatbubbleOutline />
              <p>{comments.length}</p>
            </div>
          </div>
          <ImageLoader src={src} borderRadius="9px" />
        </Link>
      </div>
      <img className={Styles.blur} src={src} alt="" />
    </div>
  );
};

export default ProfileCard;
