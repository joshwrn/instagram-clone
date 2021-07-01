import React from 'react';
import '../../styles/sidebar.css';
import jupiter from '../../assets/misc/jupiter.jpg';

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div id="sidebar-container">
        <div id="sidebar-profile-container">
          <div id="sidebar-image-container">
            <img id="sidebar-profile-img" src={jupiter} alt="" />
            <img id="sidebar-profile-img-blur" src={jupiter} alt="" />
          </div>
          <div id="sidebar-name-container">
            <h2 id="sidebar-display-name">Josh Warren</h2>
            <p id="sidebar-username">@joshwrn</p>
          </div>
        </div>
        <div id="sidebar-stats">
          <p className="sidebar-stat">
            <span className="stat-number">556</span> Followers
          </p>
          <p className="sidebar-stat">
            <span className="stat-number">103</span> Following
          </p>
        </div>
        <div className="footer">
          <p className="copyright">© 2021 COPYRIGHT GOES HERE</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
