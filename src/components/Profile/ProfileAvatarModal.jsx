import React from 'react';
import '../../styles/profile/profile__avatar__modal.css';

const ProfileAvatarModal = ({ src, getAvatarModal }) => {
  return (
    <div onClick={getAvatarModal} id="profile__avatar-modal">
      <img id="profile__avatar-modal__img" src={src} alt="" />
    </div>
  );
};

export default ProfileAvatarModal;
