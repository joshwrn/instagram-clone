import React, { useEffect, useRef } from 'react';
import '../../styles/nav/nav__user-menu.css';
import { NavLink, Link } from 'react-router-dom';

const NavUserMenu = ({ setOpenMenu, currentUser, logout }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setOpenMenu(false);
  };

  return (
    <div onClick={handleClick} id="user-menu__container">
      <div id="user-menu__inner">
        {currentUser ? (
          <>
            <NavLink
              className="user-menu__option"
              to={`/profile/${currentUser.uid}`}
            >
              <div>
                <p>Profile</p>
              </div>
            </NavLink>
            <div className="user-menu__option">
              <p>Change Theme</p>
            </div>
            <div onClick={logout} className="user-menu__option">
              <p>Logout</p>
            </div>
          </>
        ) : (
          <>
            <Link to={'/sign-up'}>
              <div className="user-menu__option">
                <p>Sign Up</p>
              </div>
            </Link>
            <div className="user-menu__option">
              <p>Change Theme</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavUserMenu;
