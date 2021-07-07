import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import '../../styles/profile/profile__feed.css';

const ProfileFeed = ({ firestore, match, newPost }) => {
  const [profileFeed, setProfileFeed] = useState([]);

  useEffect(() => {
    return getFeed();
  }, [newPost]);

  const getFeed = () => {
    let temp = [];
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
            likes={item.data().likesCounter}
            comments={item.data().commentsCounter}
          />
        );
      })}
    </div>
  );
};

export default ProfileFeed;
