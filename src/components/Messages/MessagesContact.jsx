import Styles from '../../styles/messages/messagesContact.module.css';
import { firestore } from '../../services/firebase';
import React, { useEffect, useState } from 'react';

const MessagesContact = ({ user, last, getCurrentMessage, index, currentIndex }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    getUserObject();
  }, []);

  const getUserObject = () => {
    firestore
      .collection('users')
      .doc(user)
      .get()
      .then((userData) => {
        if (userData.exists) {
          setCurrentUser(userData.data());
        }
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    getCurrentMessage(index);
  };

  return (
    <div
      onClick={handleClick}
      className={index === currentIndex ? Styles.active : Styles.container}
    >
      <img className={Styles.avatar} src={currentUser?.profilePhoto} alt="" />
      <div className={Styles.contactInfo}>
        <p className={Styles.name}>{currentUser?.displayName}</p>
        <p className={Styles.message}>
          {last?.message.length >= 20 ? last?.message.substring(0, 20) + '...' : last?.message}
        </p>
      </div>
    </div>
  );
};

export default MessagesContact;
