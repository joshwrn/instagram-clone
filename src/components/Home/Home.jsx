import React from 'react';
import Sidebar from './HomeSidebar';
import Card from './HomeCard.jsx';
import '../../styles/home/home.css';
import unicorn from '../../assets/img/cards/unicorn.jpg';

const Home = () => {
  return (
    <div id="home">
      <div id="home-inner">
        <div id="feed">
          <Card src={unicorn} />
          <Card src="https://images.unsplash.com/photo-1624525805763-2d7e558acd68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1046&q=80" />
          <Card src="https://images.unsplash.com/photo-1570022499579-ca35cc84bdef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
