import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import '../../styles/profile/profile__feed.css';

const ProfileFeed = ({ firestore, match, newPost, setLoading, loading, loaded }) => {
  const [profileFeed, setProfileFeed] = useState([]);
  const [loads, setLoads] = useState(0);

  useEffect(() => {
    return getFeed();
  }, [newPost]);

  useEffect(() => {
    if (profileFeed.length > 0 && loads === profileFeed.length) {
      setLoading((old) => [...old], {
        [loading[2]]: (loading[2].loading = false),
      });
    }
  }, [loads]);

  const getFeed = () => {
    let temp = [];
    return firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.complete = false;
          temp.push(doc);
        });
        setProfileFeed(temp);
      });
  };

  const handleLoad = () => {
    setLoads((prev) => prev + 1);
  };

  return (
    <div id="profile__feed">
      {profileFeed.map((item) => {
        return (
          <ProfileCard
            key={item.id}
            src={item.data().src}
            match={match}
            postId={item.id}
            likes={item.data().likesCounter}
            comments={item.data().commentsCounter}
            handleLoad={handleLoad}
            loaded={loaded}
          />
        );
      })}
    </div>
  );
};

export default ProfileFeed;
