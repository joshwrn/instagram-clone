import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

import '../../styles/nav.css';

const Nav = () => {
  return (
    <div id="nav">
      <div id="nav-inner">
        <div id="nav-logo">
          <h2>Instagram</h2>
        </div>
        <div id="nav-search">
          <form autoComplete="off">
            <input id="nav-search-input" type="text" placeholder="Search" />
          </form>
        </div>
        <div id="nav-icons">
          <NavLink exact to="/">
            <HomeRoundedIcon className="nav-icon" />
          </NavLink>
          <EmailRoundedIcon className="nav-icon nav-icon-large" />
          <FavoriteRoundedIcon className="nav-icon nav-icon-large" />
          <NavLink exact to="/profile">
            <PersonRoundedIcon className="nav-icon" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
