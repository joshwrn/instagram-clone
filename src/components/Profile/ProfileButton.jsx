import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firestore, firestoreFieldValue } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';

const ProfileButton = ({
  Styles,
  currentUser,
  match,
  currentProfile,
  getUserObject,
  handleFollowers,
}) => {
  const [following, setFollowing] = useState(false);
  const { userProfile } = useAuth();
  let history = useHistory();

  useEffect(() => {
    const check = currentProfile?.followers.includes(userProfile?.userID);
    if (check) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [currentProfile]);

  //+ follow
  const handleFollow = async (e) => {
    e.preventDefault();
    if (!userProfile) return history.push('/sign-up');
    const thisUser = firestore.collection('users').doc(match);
    const userRef = firestore.collection('users').doc(userProfile.userID);

    await thisUser.update({
      followers: firestoreFieldValue.arrayUnion(userProfile.userID),
    });
    await userRef.update({
      following: firestoreFieldValue.arrayUnion(currentProfile.userID),
    });
    await thisUser.update({
      notifications: firestoreFieldValue.arrayUnion({
        user: userProfile.userID,
        type: 'followed',
        time: Date.now(),
      }),
    });
    getUserObject();
  };

  //+ unfollow
  const handleUnfollow = async (e) => {
    e.preventDefault();

    const thisUser = firestore.collection('users').doc(match);
    const userRef = firestore.collection('users').doc(userProfile.userID);

    await thisUser.update({
      followers: firestoreFieldValue.arrayRemove(userProfile.userID),
    });
    await userRef.update({
      following: firestoreFieldValue.arrayRemove(currentProfile.userID),
    });
    getUserObject();
  };

  const handleLink = (e) => {
    e.preventDefault();
    if (handleFollowers) {
      handleFollowers(e);
    }
    history.push('/settings');
  };

  //+ decides if profile button should be follow or edit
  let button = (
    <button onClick={handleFollow} className={Styles.profileBtn}>
      Follow
    </button>
  );

  if (following) {
    button = (
      <button onClick={handleUnfollow} className={Styles.profileBtn}>
        Unfollow
      </button>
    );
  }
  // if contains user. set following
  if (currentUser?.uid === match) {
    button = (
      <button onClick={handleLink} className={Styles.profileBtn}>
        Edit Profile
      </button>
    );
  }

  return <>{button}</>;
};

export default ProfileButton;
