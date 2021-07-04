import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import '../../styles/profile/profile__feed.css';
import unicorn from '../../assets/img/cards/unicorn.jpg';

const ProfileFeed = ({ firestore, match }) => {
  const [profileFeed, setProfileFeed] = useState([]);
  let temp = [];

  useEffect(() => {
    return getFeed();
  }, []);

  const getFeed = () => {
    return firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          temp.push(doc);
        });
        setProfileFeed(temp);
      });
  };

  return (
    <div className="profile__feed">
      {profileFeed.map((item) => {
        return (
          <ProfileCard
            key={item.id}
            src={item.data().src}
            match={match}
            postId={item.id}
          />
        );
      })}
    </div>
  );
};

export default ProfileFeed;
