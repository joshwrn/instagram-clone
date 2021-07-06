import React from 'react';
import '../../styles/settings/settings.css';
import { useAuth } from '../../contexts/AuthContext';
import { IoImage, IoPencil } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { firestore, initFire, timestamp } from '../../services/firebase';

const Settings = () => {
  const { getUserProfile, currentUser, userProfile } = useAuth();
  const handlePhotoChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.size < 1000000) {
      handleUpload(e.target.name, file);
    } else {
      console.log('fail');
    }
  };
  const handleUpload = async (imgType, file) => {
    const storageRef = initFire.storage().ref();
    const fileRef = storageRef.child(`${currentUser.uid}/${imgType}`);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    const userRef = firestore.collection('users').doc(currentUser.uid);
    await userRef.set(
      {
        [imgType]: fileUrl,
      },
      { merge: true }
    );
    getUserProfile();
  };

  return (
    <div id="settings">
      <div id="settings__container">
        <h3>Settings</h3>
        <div id="settings__inner">
          <div>
            <label id="banner-ov-con">
              <input
                name="banner"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="file-input"
                onChange={handlePhotoChange}
              />
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
                    onChange={handlePhotoChange}
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    className="file-input"
                    name="profilePhoto"
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
                    className="input-box-display"
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
          <Link to={`/profile/${userProfile && userProfile.userID}`}>
            <button id="settings__profile-btn">View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
