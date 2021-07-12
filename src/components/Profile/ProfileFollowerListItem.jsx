import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { useHistory } from 'react-router-dom';

const ProfileFollowerListItem = ({ item, Styles, handleFollowers }) => {
  const [current, setCurrent] = useState(null);
  let history = useHistory();
  useEffect(() => {
    const getUser = async () => {
      const userRef = firestore.collection('users').doc(item);
      const thisUser = await userRef.get();
      setCurrent(thisUser.data());
    };
    getUser();
  }, []);

  const handleLink = (e) => {
    e.preventDefault();
    handleFollowers(e);
    history.push(`/profile/${current?.userID}`);
  };
  return (
    <div className={Styles.listItem}>
      <div onClick={handleLink} className={Styles.start}>
        <img className={Styles.avatar} src={current?.profilePhoto} alt="" />
        <div className={Styles.names}>
          <p className={Styles.displayName}>{current?.displayName}</p>
          <p className={Styles.username}>@{current?.username}</p>
        </div>
      </div>

      <button className={Styles.button}>Follow</button>
    </div>
  );
};

export default ProfileFollowerListItem;
