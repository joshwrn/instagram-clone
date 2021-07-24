import React, { useState, useEffect } from 'react';
import Styles from '../../styles/notifications/notifications.module.css';
import NotificationsItem from './NotificationsItem';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../services/firebase';

const Notifications = ({ handleNoti, setCurrentNotis }) => {
  const [notiArray, setNotiArray] = useState([]);
  const { userProfile, getUserProfile } = useAuth();
  const [time, setTime] = useState();

  useEffect(() => {
    const currentTime = new Date().getTime();
    setTime(currentTime);
  }, []);

  useEffect(() => {
    console.log('get user profile noti');
    getUserProfile();
  }, []);

  useEffect(async () => {
    console.log('notification user profile update', time, userProfile.userID);
    if (time) {
      const userRef = firestore.collection('users').doc(userProfile.userID);
      await userRef.set(
        {
          lastNotify: time,
        },
        { merge: true }
      );
      setCurrentNotis(0);
      setNotiArray(
        userProfile.notifications?.slice(Math.max(userProfile.notifications.length - 10, 0))
      );
    }
  }, [userProfile]);

  return (
    <div onClick={handleNoti} className={Styles.container}>
      <div className={Styles.inner}>
        {notiArray
          ? notiArray.map((item) => (
              <NotificationsItem key={item.time} userProfile={userProfile} item={item} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Notifications;
