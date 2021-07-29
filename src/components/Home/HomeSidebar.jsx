import React, { useState } from 'react';
import Styles from '../../styles/home/home__sidebar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginButton from './LoginButton.jsx';
import { IoAddCircleOutline } from 'react-icons/io5';

const Sidebar = () => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={Styles.sidebar}>
      <div className={Styles.container}>
        {userProfile ? (
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
        ) : null}
        {userProfile && (
          <div className={Styles.stats}>
            <div className={Styles.statContainer}>
              <div className={Styles.stat}>
                <p className={Styles.number}>{userProfile.following.length}</p>
              </div>
              <p>Following</p>
            </div>
            <div className={Styles.statContainer}>
              <div className={Styles.stat}>
                <p className={Styles.number}>{userProfile.followers.length}</p>
              </div>
              <p>Followers</p>
            </div>
            <div className={Styles.statContainer}>
              <div className={Styles.stat}>
                <p className={Styles.number}>{userProfile.postsCounter}</p>
              </div>
              <p>Posts</p>
            </div>
            <div className={Styles.statContainer}>
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
