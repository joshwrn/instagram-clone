import React from 'react';
import Styles from '../../styles/home/home__sidebar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginButton from './LoginButton.jsx';

const Sidebar = () => {
  const { userProfile } = useAuth();

  return (
    <div className={Styles.sidebar}>
      <div className={Styles.container}>
        {userProfile ? (
          <Link to={`/profile/${userProfile.userID}`}>
            <div className={Styles.profileContainer}>
              <div className={Styles.imageContainer}>
                <img className={Styles.profileImg} src={userProfile.profilePhoto} alt="" />
                <img className={Styles.profileImgBlur} src={userProfile.profilePhoto} alt="" />
              </div>
              <div className={Styles.nameContainer}>
                <h2 className={Styles.displayName}>{userProfile.displayName}</h2>
                <p className={Styles.username}>@{userProfile.username}</p>
              </div>
            </div>
          </Link>
        ) : null}
        <LoginButton />
        {/* {userProfile && (
          <div id="home__sidebar__stats">
            <p className="home__sidebar__stat">
              <span className="stat__number">
                {userProfile.followersCounter}
              </span>{' '}
              Followers
            </p>
            <p className="home__sidebar__stat">
              <span className="stat__number">
                {userProfile.followingCounter}
              </span>{' '}
              Following
            </p>
          </div>
        )} */}

        <div className={Styles.footer}>
          <p className={Styles.copyright}>© 2021 COPYRIGHT GOES HERE</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
