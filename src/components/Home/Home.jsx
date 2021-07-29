import React from 'react';
import Sidebar from './HomeSidebar';
import HomeFeed from './HomeFeed';
import Styles from '../../styles/home/home.module.css';
import ScrollToTop from '../../functions/ScrollToTop';

const Home = () => {
  return (
    <div className={Styles.home}>
      <ScrollToTop />
      <div className={Styles.inner}>
        <HomeFeed />
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
