import React, { useEffect, useState } from 'react';
import Styles from '../../styles/messages/messagesContact.module.css';
import { firestore } from '../../services/firebase';
import convertTime from '../../functions/convertTime';
import ImageLoader from '../reusable/ImageLoader';

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

  const getTime = () => {
    const currentTime = Date.now();
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

  useEffect(() => {
    getUserObject();
    getTime();
  }, []);

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
      <div className={Styles.avatarContainer}>
        <ImageLoader
          src={currentUser?.profilePhoto}
          width="65px"
          height="65px"
          borderRadius="100%"
        />
      </div>

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
