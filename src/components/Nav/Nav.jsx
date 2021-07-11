import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  IoHomeOutline,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import logo from '../../assets/img/logo/logo-2.png';
import NavUserMenu from './NavUserMenu';
import '../../styles/nav/nav.css';

const Nav = () => {
  const { currentUser, logout } = useAuth();
  const [theme, setTheme] = useState('light');
  const [openMenu, setOpenMenu] = useState(false);

  const handleUserIcon = (e) => {
    e.preventDefault();
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div id="nav">
      <div id="nav__inner">
        <Link to="/">
          <div id="nav__logo">
            <img id="nav__logo__img" src={logo} alt="" />
            <h2>Instagram</h2>
          </div>
        </Link>
        <div id="nav__search">
          <form autoComplete="off">
            <input id="nav__search-input" type="text" placeholder="Search" />
          </form>
        </div>
        <div id="nav__icons">
          <NavLink exact to="/">
            <IoHomeOutline className="nav__icon home" />
          </NavLink>
          <IoChatbubbleOutline className="nav__icon chat" />
          <IoHeartOutline className="nav__icon heart" />
          <div id="nav__user-menu-container" ref={menuRef}>
            <NavLink to={`/profile/${currentUser?.uid}`}>
              <IoPersonOutline onClick={handleUserIcon} className="nav__icon person" />
            </NavLink>
            {openMenu ? (
              <NavUserMenu
                theme={theme}
                setTheme={setTheme}
                setOpenMenu={setOpenMenu}
                logout={logout}
                currentUser={currentUser}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
