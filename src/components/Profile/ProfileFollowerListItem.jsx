import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore } from '../../services/firebase';
import ProfileButton from './ProfileButton';
import ImageLoader from '../reusable/ImageLoader';

const ProfileFollowerListItem = ({ item, Styles, handleFollowers, currentTab, currentUser }) => {
  const [current, setCurrent] = useState(null);

  let history = useHistory();
  const getUser = async () => {
    const userRef = firestore.collection('users').doc(item);
    const thisUser = await userRef.get();
    setCurrent(thisUser.data());
  };
  useEffect(() => {
    getUser();
  }, [currentTab]);

  const handleLink = (e) => {
    e.preventDefault();
    handleFollowers(e);
    history.push(`/profile/${current?.userID}`);
  };

  return (
    <div className={Styles.listItem}>
      <div onClick={handleLink} className={Styles.start}>
        <div className={Styles.avatarContainer}>
          <ImageLoader src={current?.profilePhoto} borderRadius="100%" />
        </div>
        <div className={Styles.names}>
          <p className={Styles.displayName}>{current?.displayName}</p>
          <p className={Styles.username}>@{current?.username}</p>
        </div>
      </div>

      <ProfileButton
        currentProfile={current}
        match={current?.userID}
        currentUser={currentUser}
        getUserObject={getUser}
        Styles={Styles}
        handleFollowers={handleFollowers}
      />
    </div>
  );
};

export default ProfileFollowerListItem;
