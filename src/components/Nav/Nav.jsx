import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  IoHomeOutline,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import logo from '../../assets/img/logo/logo-2.png';

import '../../styles/nav/nav.css';

const Nav = () => {
  const { currentUser } = useAuth();
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
            <IoHomeOutline className="nav__icon" />
          </NavLink>
          <IoChatbubbleOutline className="nav__icon" />
          <IoHeartOutline className="nav__icon" />
          <NavLink
            to={currentUser ? `/profile/${currentUser.uid}` : '/sign-up'}
          >
            <IoPersonOutline className="nav__icon" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
