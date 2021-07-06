import React from 'react';
import '../../styles/profile/profile__sidebar.css';

const ProfileSidebar = ({ currentProfile }) => {
  return (
    <div id="profile__sidebar">
      <div className="user-names">
        <h2 className="display-name">{currentProfile.displayName}</h2>
        <h3 className="username">@{currentProfile.username}</h3>
      </div>
      <div id="profile__sidebar__counters">
        <div className="posts-container">
          <h3>{currentProfile.postsCounter}</h3>
          <p className="posts">Posts</p>
        </div>
        <div className="user-info">
          <div className="following-container">
            <h3> {currentProfile.followingCounter} </h3>
            <p className="following">Following</p>
          </div>
          <div className="followers-container">
            <h3>{currentProfile.followersCounter}</h3>{' '}
            <p className="followers">Followers</p>
          </div>
        </div>
      </div>
      <div className="bio">
        <h3 className="header">Bio</h3>
        <p className="text">{currentProfile.bio}</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
