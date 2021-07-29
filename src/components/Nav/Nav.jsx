import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  IoHomeOutline,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoAddCircleOutline,
} from 'react-icons/io5';
import logo from '../../assets/img/logo/logo-2.png';
import NavUserMenu from './NavUserMenu';
import Styles from '../../styles/nav/nav.module.css';
import Notifications from '../Notifications/Notifications';
import NavSearch from './NavSearch';
import { light, dark } from '../../functions/theme';
import debounce from '../../functions/debounce';

const Nav = () => {
  const { currentUser, logout, userProfile } = useAuth();
  const [theme, setTheme] = useState('light');
  const [openMenu, setOpenMenu] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [currentNotis, setCurrentNotis] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleUserIcon = (e) => {
    e.preventDefault();
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  };

  const handleNoti = (e) => {
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

  useEffect(() => {
    if (userProfile && userProfile.notifications) {
      const unseen = userProfile.notifications.filter((item) => {
        if (item.time > userProfile.lastNotify) {
          return true;
        }
      });
      setCurrentNotis(unseen);
    }
    if (userProfile && userProfile.theme) {
      if (userProfile.theme === 'dark') {
        dark();
        setTheme('dark');
      } else if (userProfile.theme === 'light') {
        light();
        setTheme('light');
      }
    }
  }, [userProfile]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    debounceChange(e.target.value);
  };

  const debounceChange = useCallback(
    debounce((nextValue) => setSearchInput(nextValue), 500),
    []
  );

  const searchRef = useRef();

  const handleSearchModal = (e) => {
    e.preventDefault();
    !openSearch && setOpenSearch(true);
  };

  return (
    <div className={Styles.nav}>
      <div className={Styles.inner}>
        <Link to="/">
          <div className={Styles.logo}>
            <img className={Styles.logoImg} src={logo} alt="" />
            <h2>Instagram</h2>
          </div>
        </Link>
        {/*//+ search box */}
        <div className={Styles.search}>
          <form autoComplete="off">
            <input
              ref={searchRef}
              onChange={handleSearch}
              value={searchValue}
              className={Styles.searchInput}
              onClick={handleSearchModal}
              type="text"
              placeholder="Search"
            />
          </form>
          {openSearch && searchInput !== '' ? (
            <NavSearch
              setSearchInput={setSearchInput}
              searchInput={searchInput}
              setOpenSearch={setOpenSearch}
              searchRef={searchRef}
            />
          ) : null}
        </div>
        <div className={Styles.icons}>
          <NavLink exact to="/">
            <IoHomeOutline className={Styles.icon + ' ' + Styles.home} />
          </NavLink>
          <NavLink exact to={userProfile ? '/messages' : '/sign-up'}>
            <IoChatbubbleOutline className={Styles.icon + ' ' + Styles.chat} />
          </NavLink>
          <IoAddCircleOutline className={Styles.icon + ' ' + Styles.add} />
          {/*//+ notifications */}
          <div onClick={handleNoti} className={Styles.notiContainer} ref={notiRef}>
            <IoHeartOutline className={Styles.icon + ' ' + Styles.heart} />
            {currentNotis.length > 0 ? (
              <div className={Styles.notiBadge}>{currentNotis.length}</div>
            ) : null}
            {openNoti && (
              <Notifications setCurrentNotis={setCurrentNotis} handleNoti={handleNoti} />
            )}
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
