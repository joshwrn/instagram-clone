import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  IoHomeOutline,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import logo from '../../assets/img/logo/logo-2.png';

import '../../styles/nav/nav.css';

const Nav = () => {
  return (
    <div id="nav">
      <div id="nav-inner">
        <Link exact to="/">
          <div id="nav-logo">
            <img id="nav-logo-img" src={logo} alt="" />
            <h2>Instagram</h2>
          </div>
        </Link>
        <div id="nav-search">
          <form autoComplete="off">
            <input id="nav-search-input" type="text" placeholder="Search" />
          </form>
        </div>
        <div id="nav-icons">
          <NavLink exact to="/">
            <IoHomeOutline className="nav-icon" />
          </NavLink>
          <IoChatbubbleOutline className="nav-icon" />
          <IoHeartOutline className="nav-icon" />
          <NavLink exact to="/profile">
            <IoPersonOutline className="nav-icon" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
