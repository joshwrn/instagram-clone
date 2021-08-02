import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from '../../styles/messages/message__item.module.css';
import ImageLoader from '../reusable/ImageLoader';

const MessageItem = ({ user, message, userProfile, currentProfile, thread, index }) => {
  const [sent, setSent] = useState(false);
  const [group, setGroup] = useState('false');

  const getStatus = () => {
    if (user === userProfile?.userID) {
      setSent(true);
    }
  };

  useEffect(() => {
    getStatus();
  }, [currentProfile]);

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
        <div className={Styles.sideContainer} />
      </div>
    );
  }

  if (sent && group === 'avatar') {
    item = (
      <div className={Styles.itemSent + ' ' + Styles.topGroup}>
        <div className={Styles.bubbleSent}>
          <p>{message}</p>
        </div>
        <div className={Styles.sideContainer}>
          <Link to={`/profile/${userProfile.userID}`}>
            <ImageLoader
              height="38px"
              width="38px"
              borderRadius="100%"
              src={userProfile.profilePhoto}
            />
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
        <div className={Styles.sideContainer} />
      </div>
    );
  }

  if (!sent && group === 'avatar') {
    item = (
      <div className={Styles.item + ' ' + Styles.topGroup}>
        <div className={Styles.bubble}>
          <p>{message}</p>
        </div>
        <div className={Styles.sideContainer}>
          <Link to={`/profile/${currentProfile?.userID}`}>
            <ImageLoader
              height="38px"
              width="38px"
              borderRadius="100%"
              src={currentProfile?.profilePhoto}
            />
          </Link>
        </div>
      </div>
    );
  }

  return <>{item}</>;
};

export default MessageItem;
