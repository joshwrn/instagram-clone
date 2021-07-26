import React, { useState, useEffect } from 'react';
import Styles from '../../styles/notifications/notifications.module.css';
import NotificationsItem from './NotificationsItem';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../services/firebase';

const Notifications = ({ handleNoti, setCurrentNotis }) => {
  const [notiArray, setNotiArray] = useState([]);
  const { userProfile, getUserProfile } = useAuth();
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentTime = new Date().getTime();
    setTime(currentTime);
  }, []);

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(async () => {
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
      setLoading(false);
    }
  }, [userProfile]);

  let notiFragment;

  if (loading) {
    notiFragment = <div className={`${Styles.loader} loader`}></div>;
  }

  if (!loading) {
    notiFragment =
      notiArray && notiArray.length > 0 ? (
        notiArray.map((item) => (
          <NotificationsItem key={item.time} userProfile={userProfile} item={item} />
        ))
      ) : (
        <p className={Styles.none}>No Notifications</p>
      );
  }

  return (
    <div onClick={handleNoti} className={Styles.container}>
      <div className={Styles.inner}>{notiFragment}</div>
    </div>
  );
};

export default Notifications;
