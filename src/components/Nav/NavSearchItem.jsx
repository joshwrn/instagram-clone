import React from 'react';
import Styles from '../../styles/nav/nav__search__item.module.css';
import { useHistory } from 'react-router-dom';

const NavSearchItem = ({ item, setOpenSearch, setSearchInput }) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(`/profile/${item.userID}`);
    setOpenSearch(false);
    setSearchInput('');
  };

  console.log(item.displayName);
  return (
    <div onClick={handleClick} className={Styles.container}>
      <div className={Styles.container}>
        <div className={Styles.start}>
          <div className={Styles.avatarContainer}>
            <img className={Styles.avatar} src={item.profilePhoto} alt="" />
          </div>
          <div className={Styles.displayName}>{item.displayName}</div>
          <div className={Styles.type}>@{item.username}</div>
        </div>
      </div>
    </div>
  );
};

export default NavSearchItem;
