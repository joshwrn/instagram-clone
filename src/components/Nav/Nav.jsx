import React from 'react';
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
          <h2>Logo</h2>
        </div>
        <div id="nav-search">
          <form>
            <input id="nav-search-input" type="text" placeholder="Search" />
          </form>
        </div>
        <div id="nav-icons">
          <HomeRoundedIcon className="nav-icon" />
          <EmailRoundedIcon className="nav-icon nav-icon-large" />
          <FavoriteRoundedIcon className="nav-icon nav-icon-large" />
          <PersonRoundedIcon className="nav-icon" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
