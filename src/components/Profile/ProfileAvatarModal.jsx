import React from 'react';
import Styles from '../../styles/profile/profile__avatar__modal.module.css';

const ProfileAvatarModal = ({ src, getAvatarModal }) => {
  return (
    <div onClick={getAvatarModal} className={Styles.modal}>
      <img className={Styles.avatar} src={src} alt="" />
    </div>
  );
};

export default ProfileAvatarModal;
