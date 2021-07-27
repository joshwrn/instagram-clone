import Styles from '../../styles/messages/messagesContact.module.css';
import { firestore } from '../../services/firebase';
import React, { useEffect, useState } from 'react';
import convertTime from '../../functions/convertTime';

const MessagesContact = ({
  user,
  time,
  last,
  getCurrentMessage,
  index,
  currentIndex,
  handleSidebar,
}) => {
  const [currentUser, setCurrentUser] = useState();
  const [addTime, setAddTime] = useState('');

  useEffect(() => {
    getUserObject();
    getTime();
  }, []);

  const getTime = () => {
    const currentTime = Date.now();
    console.log(time, currentTime);
    const converted = convertTime(time, currentTime);
    setAddTime(converted);
  };

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
    handleSidebar();
  };

  return (
    <div
      onClick={handleClick}
      className={index === currentIndex ? Styles.active : Styles.container}
    >
      <img className={Styles.avatar} src={currentUser?.profilePhoto} alt="" />
      <div className={Styles.contactInfo}>
        <p className={Styles.name}>{currentUser?.displayName}</p>
        <div className={Styles.infoContainer}>
          <p className={Styles.message}>
            {last?.message.length >= 15 ? last?.message.substring(0, 15) + '...' : last?.message}
          </p>
          <p className={Styles.time}>{addTime}</p>
        </div>
      </div>
    </div>
  );
};

export default MessagesContact;
