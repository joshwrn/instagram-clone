import React, { useEffect, useState } from 'react';
import Styles from '../../styles/profile/profile__sidebar.module.css';
import ProfileFollowers from './ProfileFollowers';

const ProfileSidebar = ({ currentProfile, loaded }) => {
  const [openFollowers, setOpenFollowers] = useState(false);

  const handleFollowers = (e) => {
    e.preventDefault();
    openFollowers ? setOpenFollowers(false) : setOpenFollowers(true);
  };

  let sidebar;

  if (loaded === false) {
    sidebar = (
      <div className={Styles.sidebar}>
        <div className={Styles.usernames}>
          <div className={`${Styles.nameLoading} gradientLoad`}></div>
          <div className={`${Styles.usernameLoading} gradientLoad`}></div>
        </div>
        <div className={`${Styles.counterLoading}`}>
          <div className={`${Styles.counterLoading} gradientLoad`}></div>
          <div className={`${Styles.counterLoading} gradientLoad`}></div>
          <div className={`${Styles.counterLoading} gradientLoad`}></div>
        </div>
      </div>
    );
  }

  if (loaded === true) {
    sidebar = (
      <div className={Styles.sidebar}>
        <div className={Styles.usernames}>
          <h2 className={Styles.displayName}>{currentProfile.displayName}</h2>
          <h3 className={Styles.username}>@{currentProfile.username}</h3>
        </div>
        <div>
          <div className={Styles.postsContainer}>
            <h3>{currentProfile.postsCounter}</h3>
            <p className={Styles.posts}>Posts</p>
          </div>
          {/*//+ followers / following */}
          <ProfileFollowers
            currentProfile={currentProfile}
            handleFollowers={handleFollowers}
            setOpenFollowers={setOpenFollowers}
            openFollowers={openFollowers}
          />
          <div onClick={handleFollowers} className={Styles.userInfo}>
            <div className={Styles.followingContainer}>
              <h3> {currentProfile.following.length} </h3>
              <p className={Styles.following}>Following</p>
            </div>
            <div onClick={handleFollowers} className={Styles.followersContainer}>
              <h3>{currentProfile.followers.length}</h3>
              <p className={Styles.followers}>Followers</p>
            </div>
          </div>
        </div>
        <div className={Styles.bio}>
          <h3 className={Styles.header}>Bio</h3>
          <p className={Styles.text}>{currentProfile.bio}</p>
        </div>
      </div>
    );
  }

  return <>{sidebar}</>;
};

export default ProfileSidebar;
