import React, { useState } from 'react';
import Styles from '../../styles/home/home__sidebar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginButton from './LoginButton.jsx';
import { IoAddCircleOutline } from 'react-icons/io5';
import ProfileFollowersModal from '../Profile/ProfileFollowersModal';
import ProfileUpload from '../Profile/ProfileUpload';

const Sidebar = ({ setNewPost }) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [currentTab, setCurrentTab] = useState();
  const [renderModal, setRenderModal] = useState(false);

  const handleFollowers = (e) => {
    e.preventDefault();
    const choice = e.target.getAttribute('data-type');
    setCurrentTab(choice);
    openFollowers ? setOpenFollowers(false) : setOpenFollowers(true);
  };

  const handleLoad = () => {
    setLoading(false);
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

  return (
    <div className={Styles.sidebar}>
      <ProfileFollowersModal
        currentProfile={userProfile}
        handleFollowers={handleFollowers}
        setOpenFollowers={setOpenFollowers}
        openFollowers={openFollowers}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={userProfile}
      />
      {renderModal && <ProfileUpload setNewPost={setNewPost} getModal={getModal} />}
      <div className={Styles.container}>
        {userProfile && (
          <Link to={`/profile/${userProfile.userID}`}>
            <div className={Styles.profileContainer}>
              <div className={Styles.imageContainer}>
                <img
                  onLoad={handleLoad}
                  style={loading ? { opacity: 0 } : { opacity: 1 }}
                  className={Styles.profileImg}
                  src={userProfile.profilePhoto}
                  alt=""
                />
                <img className={Styles.profileImgBlur} src={userProfile.profilePhoto} alt="" />
              </div>
              <div className={Styles.nameContainer}>
                <h2 className={Styles.displayName}>{userProfile.displayName}</h2>
                <p className={Styles.username}>@{userProfile.username}</p>
              </div>
            </div>
          </Link>
        )}
        {userProfile && (
          <div className={Styles.stats}>
            <div onClick={handleFollowers} data-type="following" className={Styles.statContainer}>
              <div data-type="following" className={Styles.stat}>
                <p data-type="following" className={Styles.number}>
                  {userProfile.following.length}
                </p>
              </div>
              <p data-type="following">Following</p>
            </div>
            <div onClick={handleFollowers} data-type="followers" className={Styles.statContainer}>
              <div data-type="followers" className={Styles.stat}>
                <p data-type="followers" className={Styles.number}>
                  {userProfile.followers.length}
                </p>
              </div>
              <p data-type="followers">Followers</p>
            </div>
            <Link className={Styles.postsLink} to={`/profile/${userProfile.userID}`}>
              <div className={Styles.statContainer}>
                <div className={Styles.stat}>
                  <p className={Styles.number}>{userProfile.postsCounter}</p>
                </div>
                <p>Posts</p>
              </div>
            </Link>
            <div onClick={getModal} className={Styles.statContainer}>
              <div className={Styles.stat}>
                <IoAddCircleOutline />
              </div>
              <p>New Post</p>
            </div>
          </div>
        )}
        <LoginButton />
      </div>
    </div>
  );
};

export default Sidebar;
