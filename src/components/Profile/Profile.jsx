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
      <div id="profile__header">
        <img
          id="profile__hero"
          src="https://images.unsplash.com/photo-1475598322381-f1b499717dda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80"
          alt=""
        />
      </div>
      <div id="profile__outer">
        {/* top bar*/}
        <div id="profile__top-section">
          <div id="profile__img-container">
            <img id="profile__img" src={jupiter} alt="" />
            <img id="profile__img-blur" src={jupiter} alt="" />
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
      <div id="profile__inner">
        {/* sidebar */}
        <ProfileSidebar />
        {/* posts */}
        <ProfileFeed />
      </div>
    </div>
  );
};

export default Profile;
