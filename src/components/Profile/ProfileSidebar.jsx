import React from 'react';
import Sidebar from '../../styles/profile/profile__sidebar.module.css';

const ProfileSidebar = ({ currentProfile, loaded }) => {
  let sidebar;

  if (loaded === false) {
    sidebar = (
      <div className={Sidebar.sidebar}>
        <div className={Sidebar.usernames}>
          <div className={Sidebar['name-loading']}></div>
          <div className={Sidebar['username-loading']}></div>
        </div>
        <div className={Sidebar['counters-loading']}>
          <div className={Sidebar['counter-loading']}></div>
          <div className={Sidebar['counter-loading']}></div>
          <div className={Sidebar['counter-loading']}></div>
        </div>
      </div>
    );
  }

  if (loaded === true) {
    sidebar = (
      <div className={Sidebar.sidebar}>
        <div className={Sidebar.usernames}>
          <h2 className={Sidebar['display-name']}>{currentProfile.displayName}</h2>
          <h3 className={Sidebar.username}>@{currentProfile.username}</h3>
        </div>
        <div id="profile__sidebar__counters">
          <div className={Sidebar['posts-container']}>
            <h3>{currentProfile.postsCounter}</h3>
            <p className={Sidebar.posts}>Posts</p>
          </div>
          <div className={Sidebar['user-info']}>
            <div className="following-container">
              <h3> {currentProfile.following.length} </h3>
              <p className={Sidebar.following}>Following</p>
            </div>
            <div className="followers-container">
              <h3>{currentProfile.followers.length}</h3>
              <p className={Sidebar.followers}>Followers</p>
            </div>
          </div>
        </div>
        <div className={Sidebar.bio}>
          <h3 className={Sidebar.header}>Bio</h3>
          <p className={Sidebar.text}>{currentProfile.bio}</p>
        </div>
      </div>
    );
  }

  return <>{sidebar}</>;
};

export default ProfileSidebar;
