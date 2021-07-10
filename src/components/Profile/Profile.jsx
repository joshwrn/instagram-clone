import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import ProfileSidebar from './ProfileSidebar';
import ProfileFeed from './ProfileFeed';
import ProfileUpload from './ProfileUpload';
import ProfileAvatarModal from './ProfileAvatarModal';
import Styles from '../../styles/profile/profile.module.css';
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
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState([
    { image: 'avatar', loading: true },
    { image: 'banner', loading: true },
    { image: 'feed', loading: true }, //change
  ]);

  //+ if the every item in loading is set to false set loaded to true
  useEffect(() => {
    if (currentProfile) {
      if (loading.every((item) => item.loading === false)) {
        setLoaded(true);
      }
    }
  }, [loading]);

  //+ set the target image to be done loading onload
  const handleLoad = (e) => {
    const { alt } = e.target;
    const imgIndex = loading.findIndex((img) => img.image === alt);
    setLoading((old) => [...old], {
      [loading[imgIndex]]: (loading[imgIndex].loading = false),
    });
  };

  //+ when theres a new post update the user profile
  useEffect(() => {
    return getUserObject();
  }, [newPost]);

  //+ get the current profiles data
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

  //+ avatar modal
  const getAvatarModal = (e) => {
    e.preventDefault();
    if (avatarModal === false) {
      setAvatarModal(true);
      document.body.classList.add('stop-scrolling');
    } else {
      setAvatarModal(false);
      document.body.classList.remove('stop-scrolling');
    }
  };

  //+ new post modal
  const getModal = (e) => {
    e.preventDefault();
    if (renderModal === false) {
      setRenderModal(true);
      document.body.classList.add('stop-scrolling');
    } else {
      setRenderModal(false);
      document.body.classList.remove('stop-scrolling');
    }
  };

  //+ decides if action button should be post or message
  let actionButton = (
    <button className={Styles['action-btn']}>
      <IoSendOutline className="action-icon" />
    </button>
  );
  if (currentUser?.uid === match.params.uid) {
    actionButton = (
      <button onClick={getModal} className={Styles['action-btn']}>
        <IoAddOutline className="action-icon" />
      </button>
    );
  }

  //+ decides if profile button should be follow or edit
  let profileButton = <button className={Styles['profile-btn']}>Follow</button>;
  if (currentUser?.uid === match.params.uid) {
    profileButton = (
      <Link to="/settings" className="link">
        <button className={Styles['profile-btn']}>Edit Profile</button>
      </Link>
    );
  }

  return (
    <>
      <div className={Styles.profile}>
        {/*//+ banner */}
        <div className={Styles.header}>
          <div className={Styles['hero-loading']} style={loaded ? { display: 'none' } : null} />
          <img
            className={Styles.hero}
            src={currentProfile?.banner}
            alt="banner"
            onLoad={handleLoad}
            style={!loaded ? { display: 'none' } : null}
          />
        </div>
        <div className={Styles.outer}>
          {/*//+ top bar*/}
          <div className={Styles['top-section']}>
            <div className={Styles['img-container']}>
              <div
                style={loaded ? { display: 'none' } : null}
                className={Styles['avatar-loading']}
              />
              <img
                onClick={getAvatarModal}
                className={Styles.avatar}
                src={currentProfile?.profilePhoto}
                alt="avatar"
                onLoad={handleLoad}
                style={!loaded ? { display: 'none' } : null}
              />
              <img
                className={Styles['avatar-blur']}
                src={currentProfile?.profilePhoto}
                alt=""
                style={!loaded ? { display: 'none' } : null}
              />
            </div>
            {avatarModal && (
              <ProfileAvatarModal
                getAvatarModal={getAvatarModal}
                src={currentProfile?.profilePhoto}
              />
            )}
            <div className={Styles['top-right']}>
              <div className={Styles['top-icon-row']}>
                {profileButton}
                {actionButton}
              </div>
              {renderModal && (
                <ProfileUpload
                  setNewPost={setNewPost}
                  currentUser={currentUser}
                  currentProfile={currentProfile}
                  getModal={getModal}
                />
              )}
            </div>
          </div>
        </div>
        <div className={Styles.inner}>
          {/*//+ sidebar */}
          <ProfileSidebar
            loaded={loaded}
            firestore={firestore}
            match={match}
            currentProfile={currentProfile}
          />
          {/*//@ posts */}
          <ProfileFeed
            newPost={newPost}
            setLoading={setLoading}
            loading={loading}
            loaded={loaded}
            firestore={firestore}
            match={match}
            currentProfile={currentProfile}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
