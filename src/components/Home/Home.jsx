import React, { useState } from 'react';
import Sidebar from './HomeSidebar';
import HomeFeed from './HomeFeed';
import Styles from '../../styles/home/home.module.css';
import ScrollToTop from '../../functions/ScrollToTop';

const Home = () => {
  const [newPost, setNewPost] = useState(0);
  return (
    <div className={Styles.home}>
      <ScrollToTop />
      <div className={Styles.inner}>
        <HomeFeed newPost={newPost} />
        <Sidebar setNewPost={setNewPost} />
      </div>
    </div>
  );
};

export default Home;
