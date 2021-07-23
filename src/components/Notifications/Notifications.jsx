import React, { useState, useEffect } from 'react';
import Styles from '../../styles/notifications/notifications.module.css';
import NotificationsItem from './NotificationsItem';
import { useAuth } from '../../contexts/AuthContext';

const Notifications = ({ handleNoti }) => {
  const [notiArray, setNotiArray] = useState([]);
  const { userProfile, setUserProfile } = useAuth();

  useEffect(() => {
    setNotiArray(userProfile.notifications);
    console.log('test');
  }, [userProfile]);

  return (
    <div onClick={handleNoti} className={Styles.container}>
      <div className={Styles.inner}>
        {notiArray.map((item) => (
          <NotificationsItem key={item.time} userProfile={userProfile} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
