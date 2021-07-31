import React, { useState, useEffect } from 'react';

import Styles from '../../styles/messages/message__item.module.css';
import { Link } from 'react-router-dom';
import ImageLoader from '../reusable/ImageLoader';

const MessageItem = ({ user, message, userProfile, currentProfile, thread, index }) => {
  const [sent, setSent] = useState(false);
  const [group, setGroup] = useState('false');

  useEffect(() => {
    getStatus();
  }, [currentProfile]);

  const getStatus = () => {
    if (user === userProfile?.userID) {
      setSent(true);
    }
  };

  useEffect(() => {
    if (user === thread[index + 1]?.user) {
      setGroup('true');
    } else if (user !== thread[index + 1]?.user) {
      setGroup('avatar');
    }
  }, [thread]);

  let item;

  if (sent && group === 'true') {
    item = (
      <div className={Styles.itemSent + ' ' + Styles.group}>
        <div className={Styles.bubbleSent}>
          <p>{message}</p>
        </div>
        <div className={Styles.avatarContainer}></div>
      </div>
    );
  }

  if (sent && group === 'avatar') {
    item = (
      <div className={Styles.itemSent + ' ' + Styles.topGroup}>
        <div className={Styles.bubbleSent}>
          <p>{message}</p>
        </div>
        <div className={Styles.avatarContainer}>
          <Link to={`/profile/${userProfile.userID}`}>
            <img className={Styles.avatar} src={userProfile.profilePhoto} alt="user-avi" />
          </Link>
        </div>
      </div>
    );
  }

  if (!sent && group === 'true') {
    item = (
      <div className={Styles.item + ' ' + Styles.group}>
        <div className={Styles.bubble}>
          <p>{message}</p>
        </div>
        <div className={Styles.avatarContainer}></div>
      </div>
    );
  }

  if (!sent && group === 'avatar') {
    item = (
      <div className={Styles.item + ' ' + Styles.topGroup}>
        <div className={Styles.bubble}>
          <p>{message}</p>
        </div>
        <div className={Styles.avatarContainer}>
          <Link to={`/profile/${currentProfile?.userID}`}>
            <img className={Styles.avatar} src={currentProfile?.profilePhoto} alt="contact-avi" />
          </Link>
        </div>
      </div>
    );
  }

  return <>{item}</>;
};

export default MessageItem;
