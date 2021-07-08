import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import '../../styles/profile/profile__feed.css';

const ProfileFeed = ({ firestore, match, newPost, setLoading, loading, loaded }) => {
  const [profileFeed, setProfileFeed] = useState([]);
  const [loads, setLoads] = useState(0);

  //+ get the feed after a new post
  useEffect(() => {
    return getFeed();
  }, [newPost]);

  //+ every time loads complete check the count to see if all the posts match the feed length
  useEffect(() => {
    if (profileFeed.length > 0 && loads === profileFeed.length) {
      setLoading((old) => [...old], {
        [loading[2]]: (loading[2].loading = false),
      });
    }
  }, [loads]);

  //+ increment up after a image loads
  const handleLoad = () => {
    setLoads((prev) => prev + 1);
  };

  //+ get the feed
  const getFeed = async () => {
    let temp = [];
    const snap = await firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .get();
    const push = await snap.forEach((doc) => {
      doc.complete = false;
      temp.push(doc);
    });
    setProfileFeed(temp);
    //+ if theres no posts set loading to false
    if (temp.length === 0) {
      setLoading((old) => [...old], {
        [loading[2]]: (loading[2].loading = false),
      });
    }
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
