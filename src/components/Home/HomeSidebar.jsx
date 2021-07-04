import React from 'react';
import '../../styles/home/home__sidebar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginButton from './LoginButton.jsx';

const Sidebar = () => {
  const { currentUser } = useAuth();

  return (
    <div id="sidebar">
      <div id="home__sidebar__container">
        {currentUser ? (
          <Link to={`/profile/${currentUser.uid}`}>
            <div id="home__sidebar__profile__container">
              <div id="home__sidebar__image__container">
                <img
                  id="home__sidebar__profile__img"
                  src={currentUser.photoURL}
                  alt=""
                />
                <img
                  id="home__sidebar__profile__img-blur"
                  src={currentUser.photoURL}
                  alt=""
                />
              </div>
              <div id="home__sidebar__name__container">
                <h2 id="home__sidebar__display-name">
                  {currentUser.displayName}
                </h2>
                <p id="home__sidebar__username">@joshwrn</p>
              </div>
            </div>
          </Link>
        ) : null}
        <LoginButton />
        {currentUser && (
          <div id="home__sidebar__stats">
            <p className="home__sidebar__stat">
              <span className="stat__number">556</span> Followers
            </p>
            <p className="home__sidebar__stat">
              <span className="stat__number">103</span> Following
            </p>
          </div>
        )}

        <div className="footer">
          <p className="copyright">© 2021 COPYRIGHT GOES HERE</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
