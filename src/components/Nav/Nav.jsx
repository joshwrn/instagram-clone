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
import Styles from '../../styles/nav/nav.module.css';
import Notifications from '../Notifications/Notifications';

const Nav = () => {
  const { currentUser, logout } = useAuth();
  const [theme, setTheme] = useState('light');
  const [openMenu, setOpenMenu] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);

  const handleUserIcon = (e) => {
    e.preventDefault();
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  };

  const handleNoti = (e) => {
    e.preventDefault();
    openNoti ? setOpenNoti(false) : setOpenNoti(true);
  };

  let menuRef = useRef();
  let notiRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }

      if (notiRef.current && !notiRef.current.contains(e.target)) {
        setOpenNoti(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <div className={Styles.nav}>
      <div className={Styles.inner}>
        <Link to="/">
          <div className={Styles.logo}>
            <img className={Styles.logoImg} src={logo} alt="" />
            <h2>Instagram</h2>
          </div>
        </Link>
        <div className={Styles.search}>
          <form autoComplete="off">
            <input className={Styles.searchInput} type="text" placeholder="Search" />
          </form>
        </div>
        <div className={Styles.icons}>
          <NavLink exact to="/">
            <IoHomeOutline className={Styles.icon + ' ' + Styles.home} />
          </NavLink>
          <NavLink exact to="/messages">
            <IoChatbubbleOutline className={Styles.icon + ' ' + Styles.chat} />
          </NavLink>
          {/*//+ notifications */}
          <div className={Styles.notiContainer} ref={notiRef}>
            <IoHeartOutline onClick={handleNoti} className={Styles.icon + ' ' + Styles.heart} />
            {openNoti && <Notifications handleNoti={handleNoti} />}
          </div>
          {/*//+ profile menu */}
          <div className="user-menu-container" ref={menuRef}>
            <NavLink
              className={Styles.profileLink}
              onClick={(e) => e.preventDefault()}
              exact
              to={`/profile/${currentUser?.uid}`}
            >
              <IoPersonOutline
                onClick={handleUserIcon}
                className={Styles.icon + ' ' + Styles.person}
              />
            </NavLink>
            {openMenu && (
              <NavUserMenu
                theme={theme}
                setTheme={setTheme}
                setOpenMenu={setOpenMenu}
                logout={logout}
                currentUser={currentUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
