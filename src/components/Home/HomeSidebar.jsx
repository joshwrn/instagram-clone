import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginButton from './LoginButton';
import ProfileFollowersModal from '../Profile/ProfileFollowersModal';
import ProfileUpload from '../Profile/ProfileUpload';
import stopScroll from '../../functions/stopScroll';
import ImageLoader from '../reusable/ImageLoader';
import Styles from '../../styles/home/home__sidebar.module.css';

const Sidebar = ({ setNewPost }) => {
  const { userProfile } = useAuth();
  const [openFollowers, setOpenFollowers] = useState(false);
  const [currentTab, setCurrentTab] = useState();
  const [renderModal, setRenderModal] = useState(false);

  const handleFollowers = (e) => {
    e.preventDefault();
    const choice = e.target.getAttribute('data-type');
    setCurrentTab(choice);
    openFollowers ? setOpenFollowers(false) : setOpenFollowers(true);
    stopScroll(openFollowers);
  };

  //+ new post modal
  const getModal = (e) => {
    e.preventDefault();
    renderModal ? setRenderModal(false) : setRenderModal(true);
    stopScroll(renderModal);
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
                <ImageLoader
                  src={userProfile.profilePhoto}
                  position="absolute"
                  width="80px"
                  height="80px"
                  cursor="pointer"
                  borderRadius="100%"
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
