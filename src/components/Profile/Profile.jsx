import React, { useState, useEffect } from 'react';
import { IoSendOutline, IoAddOutline } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { firestore } from '../../services/firebase';
import ProfileSidebar from './ProfileSidebar';
import ProfileFeed from './ProfileFeed';
import ProfileUpload from './ProfileUpload';
import ProfileAvatarModal from './ProfileAvatarModal';
import Styles from '../../styles/profile/profile.module.css';
import { useAuth } from '../../contexts/AuthContext';
import ProfileButton from './ProfileButton';
import ScrollToTop from '../../functions/ScrollToTop';
import stopScroll from '../../functions/stopScroll';

const Profile = (props) => {
  const [currentProfile, setCurrentProfile] = useState();
  const [avatarModal, setAvatarModal] = useState(false);
  const [renderModal, setRenderModal] = useState(false);
  const [newPost, setNewPost] = useState(0);
  const [noPosts, setNoPosts] = useState(false);
  const { match } = props;
  const { currentUser, userProfile } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState([
    { image: 'avatar', loading: true },
    { image: 'banner', loading: true },
  ]);
  let history = useHistory();
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

  //+ when theres a new post update the user profile
  useEffect(() => {
    setNoPosts(false);
    return getUserObject();
  }, [newPost]);

  useEffect(() => {
    getUserObject();
    setNoPosts(false);
  }, [match]);

  //+ avatar modal
  const getAvatarModal = (e) => {
    e.preventDefault();
    avatarModal ? setAvatarModal(false) : setAvatarModal(true);
    stopScroll(avatarModal);
  };

  //+ new post modal
  const getModal = (e) => {
    e.preventDefault();
    renderModal ? setRenderModal(false) : setRenderModal(true);
    stopScroll(renderModal);
  };

  //+ new message link
  const newMessage = () => {
    if (!userProfile) return history.push('/sign-up');
    history.push(`/messages/${currentProfile.userID}`);
  };

  //+ decides if action button should be post or message
  let actionButton = (
    <button onClick={newMessage} className={Styles.actionBtn}>
      <IoSendOutline className="action-icon" />
    </button>
  );
  if (currentUser?.uid === match.params.uid) {
    actionButton = (
      <button onClick={getModal} className={Styles.actionBtn}>
        <IoAddOutline className="action-icon" />
      </button>
    );
  }

  return (
    <>
      <div className={Styles.profile}>
        <ScrollToTop />
        {/*//+ banner */}
        <div className={Styles.header}>
          <div
            className={`${Styles.heroLoading} gradientLoad`}
            style={loaded ? { display: 'none' } : null}
          />
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
          <div className={Styles.topSection}>
            <div className={Styles.imgContainer}>
              <div
                style={loaded ? { display: 'none' } : null}
                className={`${Styles.avatarLoading} gradientLoad`}
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
                className={Styles.avatarBlur}
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
            <div className={Styles.topRight}>
              <div className={Styles.topIconRow}>
                {/*//+ following button */}
                <ProfileButton
                  firestore={firestore}
                  Styles={Styles}
                  currentUser={currentUser}
                  match={match.params.uid}
                  currentProfile={currentProfile}
                  getUserObject={getUserObject}
                />
                {actionButton}
              </div>
              {renderModal && <ProfileUpload setNewPost={setNewPost} getModal={getModal} />}
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
            currentUser={currentUser}
            getUserObject={getUserObject}
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
            noPosts={noPosts}
            setNoPosts={setNoPosts}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
