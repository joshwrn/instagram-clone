import React from 'react';
import Styles from '../../styles/home/home__card__overlay.module.css';
import { firestore, firestoreFieldValue } from '../../services/firebase';
import { IoCloseOutline } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';

const HomeCardOverlay = ({ getModal, type, userID, post }) => {
  const { userProfile } = useAuth();
  let history = useHistory();
  //+ unfollow
  const handleUnfollow = async (e) => {
    const thisUser = firestore.collection('users').doc(userID);
    const userRef = firestore.collection('users').doc(userProfile.userID);

    await thisUser.update({
      followers: firestoreFieldValue.arrayRemove(userProfile.userID),
    });
    await userRef.update({
      following: firestoreFieldValue.arrayRemove(userID.userID),
    });
  };

  const handleShare = () => {
    copyToClipboard(`${window.location.host}/post/${userID}/${post.id}`);
  };

  const copyToClipboard = (content) => {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const openLink = (type) => {
    history.push(`/${type}`);
  };

  let button;

  if (type === 'share') {
    button = (
      <div className={Styles.share}>
        <input
          className={Styles.input}
          value={`${window.location.host}/post/${userID}/${post.id}`}
        />
        <button onClick={handleShare} className={Styles.button}>
          Copy Link
        </button>
      </div>
    );
  }

  if (type === 'follow') {
    if (!userProfile) {
      button = (
        <button
          onClick={() => {
            openLink('sign-up');
          }}
          className={Styles.button}
        >
          Login
        </button>
      );
    }
    if (userProfile.userID === userID) {
      button = (
        <button
          onClick={() => {
            openLink('settings');
          }}
          className={Styles.button}
        >
          Edit Profile
        </button>
      );
    }
    if (userProfile.userID !== userID) {
      button = (
        <button onClick={handleUnfollow} className={Styles.button}>
          Unfollow
        </button>
      );
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <IoCloseOutline onClick={getModal} className={Styles.close} />
      </div>
      <div className={Styles.main}>{button}</div>
    </div>
  );
};

export default HomeCardOverlay;