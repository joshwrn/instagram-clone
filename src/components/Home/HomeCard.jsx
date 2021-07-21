import React from 'react';
import Styles from '../../styles/home/home__card.module.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Link } from 'react-router-dom';
import {
  IoShareOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoSendOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

import profilePic from '../../assets/misc/toa-heftiba-YCi4c79ZDIE-unsplash.jpg';

const Card = ({ src }) => {
  return (
    <div className={Styles.card}>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <div className={Styles.left}>
            <img src={profilePic} alt="" className={Styles.avatar} />
            <div className={Styles.userInfo}>
              <p className={Styles.displayName}>Emily Browning</p>
              <p className={Styles.username}>@embr32</p>
            </div>
          </div>
          <div className={Styles.right}>
            <MoreHorizIcon className={Styles.moreIcon} />
          </div>
        </div>
        <div className={Styles.footer}>
          <div className={Styles.firstChild}>
            <div className={Styles.left}>
              <IoHeartOutline className="card__icon like-icon" />
              <IoChatbubbleOutline className={Styles.icon} />
              <IoShareOutline className={Styles.icon} />
            </div>
            <IoShareSocialOutline className={Styles.icon} />
          </div>
          <p className={Styles.likes}>3,543 likes</p>
          <div className={Styles.comments}>
            <p className={Styles.viewAll}>View All Comments</p>
            <p className={Styles.comment}>
              <span className={Styles.commentUser}>Andrew G</span> awesome 🔥
            </p>
            <p className={Styles.comment}>
              <span className={Styles.commentUser}>Sofie Smith</span> wow so cool!
            </p>
          </div>
          <div className={Styles.commentBox}>
            <form className={Styles.commentForm}>
              <input className={Styles.inputBox} type="text" placeholder="Add a comment..." />
            </form>
            <IoSendOutline className={Styles.send} />
          </div>
        </div>
        <Link className={Styles.imageLink} to="/Post">
          <img className={Styles.image} src={src} alt="" />
        </Link>
      </div>
      <img className={Styles.imageBlur + ' ' + 'blur'} src={src} alt="" />
    </div>
  );
};

export default Card;
