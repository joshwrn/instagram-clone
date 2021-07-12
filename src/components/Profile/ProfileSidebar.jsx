import React, { useEffect, useState } from 'react';
import Styles from '../../styles/profile/profile__sidebar.module.css';
import ProfileFollowersModal from './ProfileFollowersModal';

const ProfileSidebar = ({ currentProfile, loaded, currentUser, getUserObject }) => {
  const [openFollowers, setOpenFollowers] = useState(false);
  const [currentTab, setCurrentTab] = useState();

  const handleFollowers = (e) => {
    e.preventDefault();
    const choice = e.target.getAttribute('data-type');
    setCurrentTab(choice);
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
          <ProfileFollowersModal
            currentProfile={currentProfile}
            handleFollowers={handleFollowers}
            setOpenFollowers={setOpenFollowers}
            openFollowers={openFollowers}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            currentUser={currentUser}
            getUserObject={getUserObject}
          />
          <div className={Styles.userInfo}>
            <div
              onClick={handleFollowers}
              data-type="following"
              className={Styles.followingContainer}
            >
              <h3 data-type="following"> {currentProfile.following.length} </h3>
              <p data-type="following" className={Styles.following}>
                Following
              </p>
            </div>
            <div
              data-type="followers"
              onClick={handleFollowers}
              className={Styles.followersContainer}
            >
              <h3 data-type="followers">{currentProfile.followers.length}</h3>
              <p data-type="followers" className={Styles.followers}>
                Followers
              </p>
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
