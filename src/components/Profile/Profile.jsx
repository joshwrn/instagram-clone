import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import ProfileSidebar from './ProfileSidebar';
import ProfileFeed from './ProfileFeed';
import ProfileUpload from './ProfileUpload';
import ProfileAvatarModal from './ProfileAvatarModal';
import '../../styles/profile/profile.css';
import { useAuth } from '../../contexts/AuthContext';
import { IoSendOutline, IoAddOutline } from 'react-icons/io5';

import { Link } from 'react-router-dom';

const Profile = (props) => {
  const [currentProfile, setCurrentProfile] = useState();
  const [avatarModal, setAvatarModal] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  const [newPost, setNewPost] = useState(0);
  const { match } = props;
  const { currentUser } = useAuth();

  useEffect(() => {
    return getUserObject();
  }, [newPost]);

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

  const getAvatarModal = (e) => {
    e.preventDefault();
    if (avatarModal === false) {
      setAvatarModal(true);
      console.log('um');
    } else {
      setAvatarModal(false);
      console.log('hi');
    }
  };

  const getModal = (e) => {
    e.preventDefault();
    if (renderModal === false) {
      setRenderModal(true);
    } else {
      setRenderModal(false);
    }
  };

  let actionButton = (
    <button className="action">
      <IoSendOutline className="action-icon" />
    </button>
  );
  if (currentUser) {
    if (currentUser.uid === match.params.uid) {
      actionButton = (
        <button onClick={getModal} className="action">
          <IoAddOutline className="action-icon" />
        </button>
      );
    }
  }

  let profileButton = <button className="profile-btn">Follow</button>;
  if (currentUser) {
    if (currentUser.uid === match.params.uid) {
      profileButton = (
        <Link to="/settings" className="link">
          <button className="profile-btn">Edit Profile</button>
        </Link>
      );
    }
  }

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
              <div id="profile__img-container">
                <img
                  onClick={getAvatarModal}
                  id="profile__img"
                  src={currentProfile.profilePhoto}
                  alt=""
                />
                <img id="profile__img-blur" src={currentProfile.profilePhoto} alt="" />
                {avatarModal && (
                  <ProfileAvatarModal
                    getAvatarModal={getAvatarModal}
                    src={currentProfile.profilePhoto}
                  />
                )}
              </div>
              <div className="right">
                <div className="icon-row">
                  {profileButton}
                  {actionButton}
                </div>
              </div>
            </div>
          </div>
          <div id="profile__inner">
            {/* sidebar */}
            {renderModal && (
              <ProfileUpload
                setNewPost={setNewPost}
                currentUser={currentUser}
                currentProfile={currentProfile}
                getModal={getModal}
              />
            )}
            <ProfileSidebar firestore={firestore} match={match} currentProfile={currentProfile} />
            {/* posts */}
            <ProfileFeed
              newPost={newPost}
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
