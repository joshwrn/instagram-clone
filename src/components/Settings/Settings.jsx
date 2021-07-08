import React, { useState, useEffect } from 'react';
import '../../styles/settings/settings.css';
import { useAuth } from '../../contexts/AuthContext';
import { IoImage, IoPencil } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { firestore, initFire } from '../../services/firebase';

const Settings = () => {
  const { getUserProfile, currentUser, userProfile } = useAuth();
  const [userInput, setUserInput] = useState('');
  const [userBio, setUserBio] = useState('');

  useEffect(() => {
    userProfile && setUserInput(userProfile.displayName);
    userProfile && setUserBio(userProfile.bio);
  }, [userProfile]);

  useEffect(() => {
    getUserProfile();
  }, [currentUser]);

  //! handle photo uploads
  //@ add file to state
  const handlePhotoChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.size < 1000000) {
      handleUpload(e.target.name, file);
    } else {
      console.log('fail');
    }
  };

  //+ upload
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

  //! handle text input changes
  //@ handle display name change
  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const reg = /[^a-zA-Z' ']/gi; //replace all but these characters
    const newVal = value.replace(reg, '');
    setUserInput(newVal);
  };

  //@ handle bio change
  const handleBioChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setUserBio(value);
  };

  //+ handle save text
  const handleTextUpload = async (e) => {
    e.preventDefault();
    if (userBio !== userProfile.bio) {
      await firestore.collection('users').doc(currentUser.uid).set(
        {
          bio: userBio,
        },
        { merge: true }
      );
    }
    if (userInput !== userProfile.displayName && userInput !== '') {
      await firestore.collection('users').doc(currentUser.uid).set(
        {
          displayName: userInput,
        },
        { merge: true }
      );
    }
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
                <p>Display Name:</p>
                <div className="settings__input">
                  <input
                    autoComplete="off"
                    name="displayName"
                    className="input-box-display"
                    type="text"
                    placeholder={userProfile && userProfile.displayName}
                    maxLength="25"
                    minLength="3"
                    onChange={handleChange}
                    value={userInput}
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
                  value={userBio}
                  onChange={handleBioChange}
                />
              </div>
              <button onClick={handleTextUpload} type="submit" id="settings__text-save-btn">
                Save
              </button>
            </form>
          </div>
        </div>

        <div id="settings__profile-btn-container">
          <Link id="settings__profile-link" to={`/profile/${userProfile && userProfile.userID}`}>
            <button id="settings__profile-btn">View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
