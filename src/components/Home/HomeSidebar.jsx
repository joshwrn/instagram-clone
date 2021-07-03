import React from 'react';
import '../../styles/home/home__sidebar.css';
import jupiter from '../../assets/misc/jupiter.jpg';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div id="home__sidebar__container">
        <Link exact to="/profile">
          <div id="home__sidebar__profile__container">
            <div id="home__sidebar__image__container">
              <img id="home__sidebar__profile__img" src={jupiter} alt="" />
              <img id="home__sidebar__profile__img-blur" src={jupiter} alt="" />
            </div>
            <div id="home__sidebar__name__container">
              <h2 id="home__sidebar__display-name">Josh Warren</h2>
              <p id="home__sidebar__username">@joshwrn</p>
            </div>
          </div>
        </Link>
        <div id="home__sidebar__stats">
          <p className="home__sidebar__stat">
            <span className="stat__number">556</span> Followers
          </p>
          <p className="home__sidebar__stat">
            <span className="stat__number">103</span> Following
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
