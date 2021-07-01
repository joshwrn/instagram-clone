import React from 'react';
import '../../styles/profile.css';

const Profile = () => {
  return (
    <div id="profile">
      <div id="profile-header">
        <img
          id="profile-hero"
          src="https://images.unsplash.com/photo-1475598322381-f1b499717dda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80"
          alt=""
        />
      </div>
      <div id="profile-picture"></div>
      <div id="profile-inner">
        <div id="feed"></div>
      </div>
    </div>
  );
};

export default Profile;
