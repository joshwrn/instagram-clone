import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoImage, IoPencil } from 'react-icons/io5';
import Styles from '../../styles/settings/settings.module.css';
import { useAuth } from '../../contexts/AuthContext';

import { firestore, storageRef } from '../../services/firebase';
import resizeImage from '../../functions/resizeImage';
import ImageLoader from '../reusable/ImageLoader';

const Settings = () => {
  const { getUserProfile, currentUser, userProfile } = useAuth();
  const [userInput, setUserInput] = useState('');
  const [userBio, setUserBio] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!userProfile) return;
    setUserInput(userProfile.displayName);
    setUserBio(userProfile.bio);
  }, [userProfile]);

  //+ updates on account sign up

  useEffect(() => {
    getUserProfile();
  }, [currentUser]);

  //+ upload profile photo
  const handleAvatar = async (file) => {
    setUploading(true);
    const fileRef = storageRef.child(`${currentUser.uid}/profilePhoto`);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    const userRef = firestore.collection('users').doc(currentUser.uid);
    await userRef.set(
      {
        ['profilePhoto']: fileUrl,
      },
      { merge: true }
    );
    setUploading(false);
    getUserProfile();
  };

  //+ upload banner
  const handleBanner = async (file) => {
    setUploading(true);
    const fileRef = storageRef.child(`${currentUser.uid}/banner`);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();
    const userRef = firestore.collection('users').doc(currentUser.uid);
    await userRef.set(
      {
        ['banner']: fileUrl,
      },
      { merge: true }
    );
    setUploading(false);
    getUserProfile();
  };

  //! handle photo uploads
  //@ add file to state
  const handlePhotoChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.size < 5000000) {
      if (e.target.name === 'profilePhoto') {
        resizeImage(e, 'none', handleAvatar, 1000);
      } else if (e.target.name === 'banner') {
        resizeImage(e, 'none', handleBanner, 2000);
      }
    }
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
      setUploading(true);
      await firestore.collection('users').doc(currentUser.uid).set(
        {
          bio: userBio,
        },
        { merge: true }
      );
      setUploading(false);
    }
    if (userInput !== userProfile.displayName && userInput !== '') {
      const lower = userInput.toLowerCase();
      setUploading(true);
      await firestore.collection('users').doc(currentUser.uid).set(
        {
          displayName: userInput,
          searchName: lower,
        },
        { merge: true }
      );
      setUploading(false);
    }
  };

  return (
    <div className={Styles.settings}>
      <div className={Styles.container}>
        <h3>Settings</h3>
        <div className={Styles.inner}>
          <div>
            <label className={Styles.bannerOverlayContainer}>
              <input
                name="banner"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className={Styles.fileInput}
                onChange={handlePhotoChange}
              />
              <div className={Styles.bannerContainer}>
                <ImageLoader src={userProfile && userProfile.banner} zIndex={'0'} />
              </div>
              <div className={Styles.bannerOverlay}>
                <IoPencil className={Styles.bannerIcon} />
              </div>
            </label>
            <form>
              <div className={Styles.containerBar}>
                <label className={Styles.profileOverlayContainer}>
                  <input
                    onChange={handlePhotoChange}
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    className={Styles.fileInput}
                    name="profilePhoto"
                  />
                  <ImageLoader
                    src={userProfile && userProfile.profilePhoto}
                    position="relative"
                    borderRadius="100%"
                    width="112px"
                    height="112px"
                    shadow="0px 0.5em 1.5em 1px rgba(0, 0, 0, 0.1)"
                  />
                  <div className={Styles.profileOverlay}>
                    <IoImage className={Styles.profileIcon} />
                  </div>
                </label>
              </div>
            </form>
          </div>
          <div className={Styles.textInputs}>
            <form className={Styles.textForm}>
              <div className={Styles.inputContainer}>
                <p>Display Name:</p>
                <div className={Styles.input}>
                  <input
                    autoComplete="off"
                    name="displayName"
                    className={Styles.inputBoxDisplay}
                    type="text"
                    placeholder={userProfile && userProfile.displayName}
                    maxLength="25"
                    minLength="3"
                    onChange={handleChange}
                    value={userInput}
                  />
                </div>
              </div>
              <div className={Styles.inputContainer}>
                <p>Bio:</p>
                <textarea
                  className={Styles.bioInput}
                  name="bio"
                  maxLength="150"
                  placeholder={userProfile && userProfile.bio}
                  value={userBio}
                  onChange={handleBioChange}
                />
              </div>
            </form>
          </div>
        </div>

        <div className={Styles.profileBtnContainer}>
          {uploading ? (
            <div className="loader"></div>
          ) : (
            <button onClick={handleTextUpload} type="submit" className={Styles.textBtn}>
              Save
            </button>
          )}
          <Link className={Styles.profileLink} to={`/profile/${userProfile && userProfile.userID}`}>
            <button className={Styles.profileBtn}>View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
