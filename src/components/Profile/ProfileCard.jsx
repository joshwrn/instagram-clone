import React from 'react';
import Styles from '../../styles/profile/profile__card.module.css';
import { Link } from 'react-router-dom';
import { IoHeartOutline, IoChatbubbleOutline } from 'react-icons/io5';

const ProfileCard = ({ src, match, postId, likes, comments, handleLoad, loaded }) => {
  return (
    <div className={Styles.card}>
      <div className={Styles.container}>
        <Link className={Styles.link} to={`/post/${match.params.uid}/${postId}`}>
          <div className={Styles.loading} style={loaded ? { display: 'none' } : null} />
          <img
            className={Styles.image}
            src={src}
            alt=""
            onLoad={handleLoad}
            style={!loaded ? { display: 'none' } : null}
          />
          <div className={Styles.overlay}>
            <div className={Styles.icon}>
              <IoHeartOutline /> <p>{likes}</p>
            </div>
            <div className={Styles.icon}>
              <IoChatbubbleOutline />
              <p>{comments}</p>
            </div>
          </div>
        </Link>
      </div>
      <img className={Styles.blur} src={src} alt="" style={!loaded ? { display: 'none' } : null} />
    </div>
  );
};

export default ProfileCard;
