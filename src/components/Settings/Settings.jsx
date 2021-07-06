import React from 'react';
import '../../styles/settings/settings.css';
import { useAuth } from '../../contexts/AuthContext';
import { IoImage, IoPencil } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { currentUser, userProfile } = useAuth();
  return (
    <div id="settings">
      <div id="settings__container">
        <h3>Settings</h3>
        <div id="settings__inner">
          <div>
            <label id="banner-ov-con">
              <input type="file" accept="image/jpeg, image/png, image/jpg" className="file-input" />
              <div className="banner-container">
                <img className="banner-image" src={userProfile && userProfile.banner} alt="" />
              </div>
              <div className="banner-overlay">
                <IoPencil className="banner-icon" />
              </div>
            </label>
            <form>
              <div id="settings__profile-container-bar">
                <label id="o-con">
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    className="file-input"
                  />
                  <img
                    id="settings__profile-container__image"
                    src={userProfile && userProfile.profilePhoto}
                    alt=""
                  />
                  <div className="p-overlay">
                    <IoImage className="p-icon" />
                  </div>
                </label>
              </div>
            </form>
          </div>

          <div id="settings__text-inputs">
            <form id="settings__text-form">
              <div className="settings__input-container">
                <p>Username:</p>
                <div className="settings__input">
                  <div className="username">
                    <p>@</p>
                  </div>
                  <input
                    autoComplete="off"
                    name="username"
                    className="input-box"
                    type="text"
                    placeholder={userProfile && userProfile.username}
                    maxLength="15"
                    minLength="4"
                    pattern="[0-9a-zA-Z_.-]*"
                  />
                </div>
              </div>
              <div className="settings__input-container">
                <p>Display Name:</p>
                <div className="settings__input">
                  <input
                    autoComplete="off"
                    name="displayName"
                    className="input-box"
                    type="text"
                    placeholder={userProfile && userProfile.displayName}
                    maxLength="15"
                    minLength="4"
                    pattern="[a-zA-Z0-9]"
                  />
                </div>
              </div>
              <div className="settings__input-container">
                <p>Bio:</p>
                <textarea
                  id="settings__bio-input"
                  name="bio"
                  maxLength="150"
                  placeholder={userProfile && userProfile.bio}
                />
              </div>
            </form>
          </div>
        </div>
        <div>
          <Link to={`/profile/${userProfile.userID}`}>
            <button id="settings__profile-btn">View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
