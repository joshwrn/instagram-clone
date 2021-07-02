import React from 'react';
import ProfileCard from './ProfileCard';
import './styles/profile-feed.css';
import unicorn from '../../assets/img/cards/unicorn.jpg';

const ProfileFeed = () => {
  return (
    <div id="profile-feed">
      <ProfileCard src={unicorn} />
      <ProfileCard
        src={
          'https://images.unsplash.com/photo-1565769583756-fe3ffffcae49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80'
        }
      />
      <ProfileCard
        src={
          'https://images.unsplash.com/photo-1624724586264-aaa82432dd13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        }
      />
      <ProfileCard
        src={
          'https://images.unsplash.com/photo-1562210569-4a9d5fb7e467?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        }
      />
    </div>
  );
};

export default ProfileFeed;
