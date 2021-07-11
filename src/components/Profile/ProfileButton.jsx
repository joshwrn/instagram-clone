import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore, firestoreFieldValue } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';

const ProfileButton = ({ Styles, currentUser, match, currentProfile }) => {
  const [following, setFollowing] = useState(false);
  const { userProfile, getUserProfile } = useAuth();

  useEffect(() => {
    const check = userProfile?.following.includes(currentProfile?.userID);
    if (check) {
      setFollowing(true);
      console.log('gi');
    }
    console.log(userProfile?.following[0], check, currentProfile?.userID);
  }, [currentProfile]);

  //+ follow
  const handleFollow = async (e) => {
    e.preventDefault();

    const thisUser = firestore.collection('users').doc(match.params.uid);
    const userRef = firestore.collection('users').doc(userProfile.userID);

    await thisUser.update({
      followers: firestoreFieldValue.arrayUnion(userProfile.userID),
    });
    await userRef.update({
      following: firestoreFieldValue.arrayUnion(currentProfile.userID),
    });
  };

  //+ unfollow
  const handleUnfollow = async (e) => {
    e.preventDefault();

    const thisUser = firestore.collection('users').doc(match.params.uid);
    const userRef = firestore.collection('users').doc(userProfile.userID);

    await thisUser.update({
      followers: firestoreFieldValue.arrayRemove(userProfile.userID),
    });
    await userRef.update({
      following: firestoreFieldValue.arrayRemove(currentProfile.userID),
    });
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
  if (currentUser?.uid === match.params.uid) {
    button = (
      <Link to="/settings" className="link">
        <button className={Styles.profileBtn}>Edit Profile</button>
      </Link>
    );
  }

  return <>{button}</>;
};

export default ProfileButton;
