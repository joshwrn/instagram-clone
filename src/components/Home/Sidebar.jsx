import React from 'react';
import '../../styles/sidebar.css';
import jupiter from '../../assets/misc/jupiter.jpg';

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div id="sidebar-profile-container">
        <div id="sidebar-image-container">
          <img id="sidebar-profile-img" src={jupiter} alt="" />
          <img id="sidebar-profile-img-blur" src={jupiter} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
