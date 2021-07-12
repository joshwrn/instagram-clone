import React, { useState, useEffect } from 'react';
import Styles from '../../styles/profile/profile__followers-modal.module.css';
import { IoCloseOutline, IoCloudUploadOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { firestore, storageRef, timestamp } from '../../services/firebase';
import ProfileFollowerListItem from './ProfileFollowerListItem';
const ProfileFollowers = ({ openFollowers, handleFollowers, currentProfile }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [currentTab, setCurrentTab] = useState([]);

  useEffect(() => {
    setFollowing(currentProfile?.following);
    setFollowers(currentProfile?.followers);
  }, [currentProfile]);

  return (
    <>
      {openFollowers && (
        <div className={Styles.modal}>
          <div className={Styles.container}>
            <div className={Styles.header}>
              <div className={Styles.tabs}>
                <div className={Styles.activeHeader}>
                  <h3>Following</h3>
                </div>
                <div className={Styles.inactiveHeader}>
                  <h3>Followers</h3>
                </div>
              </div>
              <IoCloseOutline onClick={handleFollowers} className={Styles.close} />
            </div>
            <div className={Styles.listContainer}>
              {currentProfile?.following.map((item) => {
                return (
                  <ProfileFollowerListItem
                    handleFollowers={handleFollowers}
                    item={item}
                    Styles={Styles}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileFollowers;
