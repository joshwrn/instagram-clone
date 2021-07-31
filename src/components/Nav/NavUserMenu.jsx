import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoPersonCircleOutline, IoPersonAddOutline, IoLogOut } from 'react-icons/io5';
import { CgDarkMode } from 'react-icons/cg';
import Styles from '../../styles/nav/nav__user-menu.module.css';
import { light, dark } from '../../functions/theme';
import { firestore } from '../../services/firebase';

const NavUserMenu = ({ setOpenMenu, currentUser, logout, theme, setTheme }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setOpenMenu(false);
  };

  const changeTheme = (e) => {
    e.preventDefault();
    if (theme === 'light') {
      dark();
      setTheme('dark');
      if (currentUser) {
        const userRef = firestore.collection('users').doc(currentUser.uid);
        userRef.set(
          {
            theme: 'dark',
          },
          { merge: true }
        );
      }
    } else if (theme === 'dark') {
      light();
      setTheme('light');
      if (currentUser) {
        const userRef = firestore.collection('users').doc(currentUser.uid);
        userRef.set(
          {
            theme: 'light',
          },
          { merge: true }
        );
      }
    }
  };

  return (
    <div onClick={handleClick} className={Styles.container}>
      <div className={Styles.inner}>
        {currentUser ? (
          <>
            <NavLink className={Styles.option} to={`/profile/${currentUser.uid}`}>
              <IoPersonCircleOutline className={Styles.icon} />
              <div>
                <p>Profile</p>
              </div>
            </NavLink>
            <div onClick={changeTheme} className={Styles.option}>
              <CgDarkMode className={Styles.icon} />
              <p>Change Theme</p>
            </div>
            <div onClick={logout} className={Styles.option}>
              <IoLogOut className={Styles.icon} />
              <p>Logout</p>
            </div>
          </>
        ) : (
          <>
            <Link className={Styles.option} to="/sign-up">
              <IoPersonAddOutline className={Styles.icon} />
              <div>
                <p>Sign Up</p>
              </div>
            </Link>
            <div onClick={changeTheme} className={Styles.option}>
              <CgDarkMode className={Styles.icon} />
              <p>Change Theme</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavUserMenu;
