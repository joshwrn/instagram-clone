import React, { useEffect, useRef } from 'react';
import '../../styles/nav/nav__user-menu.css';
import { NavLink, Link } from 'react-router-dom';
import { IoPersonCircleOutline, IoPersonAddOutline, IoLogOut } from 'react-icons/io5';
import { CgDarkMode } from 'react-icons/cg';

const NavUserMenu = ({ setOpenMenu, currentUser, logout, theme, setTheme }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setOpenMenu(false);
  };

  const changeTheme = (e) => {
    e.preventDefault();
    const root = document.documentElement;
    if (theme === 'light') {
      root.style.setProperty('--primary-font-color', 'white');
      root.style.setProperty('--nav-background-color', 'rgba(0, 0, 0, 0.733)');
      root.style.setProperty('--primary-transparent-color', 'rgba(0, 0, 0, 0.854)');
      root.style.setProperty('--user-menu-font-color', 'white');
      root.style.setProperty('--primary-background-color', 'black');
      root.style.setProperty('--primary-border', '1px solid rgb(41, 41, 41)');
      root.style.setProperty('--secondary-border', '1px solid rgb(41, 41, 41)');
      setTheme('dark');
    } else if (theme === 'dark') {
      root.style.setProperty('--primary-font-color', 'black');
      root.style.setProperty('--nav-background-color', 'rgba(255, 255, 255, 0.733)');
      root.style.setProperty('--primary-transparent-color', 'rgba(255, 255, 255, 0.9)');
      root.style.setProperty('--user-menu-font-color', 'black');
      root.style.setProperty('--primary-background-color', 'white');
      root.style.setProperty('--primary-border', '1px solid rgb(41, 41, 41, 0)');
      root.style.setProperty('--secondary-border', '1px solid rgb(206, 206, 206)');
      setTheme('light');
    }
  };

  return (
    <div onClick={handleClick} id="user-menu__container">
      <div id="user-menu__inner">
        {currentUser ? (
          <>
            <NavLink className="user-menu__option" to={`/profile/${currentUser.uid}`}>
              <IoPersonCircleOutline className="nav__menu__icon" />
              <div>
                <p>Profile</p>
              </div>
            </NavLink>
            <div onClick={changeTheme} className="user-menu__option">
              <CgDarkMode className="nav__menu__icon" />
              <p>Change Theme</p>
            </div>
            <div onClick={logout} className="user-menu__option">
              <IoLogOut className="nav__menu__icon" />
              <p>Logout</p>
            </div>
          </>
        ) : (
          <>
            <Link className="user-menu__option" to={'/sign-up'}>
              <IoPersonAddOutline className="nav__menu__icon" />
              <div>
                <p>Sign Up</p>
              </div>
            </Link>
            <div onClick={changeTheme} className="user-menu__option">
              <CgDarkMode className="nav__menu__icon" />
              <p>Change Theme</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavUserMenu;
