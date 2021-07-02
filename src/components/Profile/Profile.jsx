import React from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileFeed from './ProfileFeed';
import '../../styles/profile/profile.css';
import jupiter from '../../assets/misc/jupiter.jpg';
import {
  IoShareOutline,
  IoHeartOutline,
  IoChatbubbleOutline,
  IoSendOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

const Profile = () => {
  return (
    <div id="profile">
      {/* banner */}
      <div id="profile-header">
        <img
          id="profile-hero"
          src="https://images.unsplash.com/photo-1475598322381-f1b499717dda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80"
          alt=""
        />
      </div>
      <div id="profile-outer">
        {/* top bar*/}
        <div id="profile-top-section">
          <div id="profile-img-container">
            <img id="profile-img" src={jupiter} alt="" />
            <img id="profile-img-blur" src={jupiter} alt="" />
          </div>
          <div className="right">
            <div id="icon-row">
              <button className="follow">Follow</button>
              <button className="message">
                <IoSendOutline className="send" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="profile-inner">
        {/* sidebar */}
        <ProfileSidebar />
        {/* posts */}
        <ProfileFeed />
      </div>
    </div>
  );
};

export default Profile;
