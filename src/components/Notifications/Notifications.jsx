import React, { useState, useEffect } from 'react';
import NotificationsItem from './NotificationsItem';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import Styles from '../../styles/notifications/notifications.module.css';

const Notifications = ({ handleNoti, setCurrentNotis, notiArray }) => {
  const { userProfile, getUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    if (userProfile) {
      getUserProfile();
    } else {
      history.push('/sign-up');
      handleNoti();
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      setLoading(false);
    }
  }, [userProfile]);

  useEffect(() => {
    if (loading) return;
    setCurrentNotis(0);
  }, [loading]);

  let notiFragment;

  if (loading) {
    notiFragment = <div className={`${Styles.loader} loader`} />;
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
