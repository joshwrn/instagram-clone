import React from 'react';
import '../../styles/profile/profile__sidebar.css';

const ProfileSidebar = () => {
  return (
    <div id="profile__sidebar">
      <div className="user-names">
        <h2 className="display-name">Josh Warren</h2>
        <h3 className="username">@joshwrn</h3>
      </div>
      <div className="user-info">
        <div className="following-container">
          <h3>503</h3> <p className="following">Following</p>
        </div>
        <div className="followers-container">
          <h3>504</h3> <p className="followers">Followers</p>
        </div>
      </div>
      <div className="bio">
        <h3 className="header">Bio</h3>
        <p className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam laoreet
          neque vitae vulputate congue.
        </p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
