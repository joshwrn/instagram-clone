import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import ProfileSidebar from './ProfileSidebar';
import ProfileFeed from './ProfileFeed';
import '../../styles/profile/profile.css';
import jupiter from '../../assets/misc/jupiter.jpg';
import {
  IoShareOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoSendOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

const Profile = (props) => {
  const [currentProfile, setCurrentProfile] = useState();
  const { match } = props;

  useEffect(() => {
    return getUserObject();
  }, []);

  const getUserObject = () => {
    firestore
      .collection('users')
      .doc(match.params.uid)
      .get()
      .then((userData) => {
        if (userData.exists) {
          setCurrentProfile(userData.data());
        }
      });
  };

  const getUserPosts = () => {};

  const handleParam = (e) => {
    console.log(match.params.uid);
    console.log(currentProfile);
  };

  return (
    <>
      {currentProfile && (
        <div id="profile">
          {/* banner */}
          <div id="profile__header">
            <img id="profile__hero" src={currentProfile.banner} alt="" />
          </div>
          <div id="profile__outer">
            {/* top bar*/}
            <div id="profile__top-section">
              <div onClick={handleParam} id="profile__img-container">
                <img
                  id="profile__img"
                  src={currentProfile.profilePhoto}
                  alt=""
                />
                <img
                  id="profile__img-blur"
                  src={currentProfile.profilePhoto}
                  alt=""
                />
              </div>
              <div className="right">
                <div id="icon-row">
                  <button className="follow">Follow</button>
                  <button className="message">
                    <IoSendOutline className="send" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="profile__inner">
            {/* sidebar */}
            <ProfileSidebar
              firestore={firestore}
              match={match}
              currentProfile={currentProfile}
            />
            {/* posts */}
            <ProfileFeed
              firestore={firestore}
              match={match}
              currentProfile={currentProfile}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
