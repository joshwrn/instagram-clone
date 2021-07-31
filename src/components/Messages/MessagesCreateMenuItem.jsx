import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import ImageLoader from '../reusable/ImageLoader';

const MessagesCreateMenuItem = ({
  Styles,
  contactID,
  setMessages,
  messages,
  handleCreate,
  getCurrentMessage,
}) => {
  const [current, setCurrent] = useState(null);
  const getUser = async () => {
    const userRef = firestore.collection('users').doc(contactID);
    const thisUser = await userRef.get();
    setCurrent(thisUser.data());
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const check = messages.some((item) => item.user === contactID);
    if (!check) {
      setMessages([{ user: contactID, time: Date.now(), messages: [] }, ...messages]);

      handleCreate(e);
    } else {
      const index = messages.findIndex((item) => item.user === contactID);
      getCurrentMessage(index);
      handleCreate(e);
    }
  };

  return (
    <div onClick={handleClick} className={Styles.listItem}>
      <div className={Styles.start}>
        <div className={Styles.avatarContainer}>
          <ImageLoader src={current?.profilePhoto} width="65px" height="65px" borderRadius="100%" />
        </div>
        <div className={Styles.names}>
          <p className={Styles.displayName}>{current?.displayName}</p>
          <p className={Styles.username}>@{current?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default MessagesCreateMenuItem;
