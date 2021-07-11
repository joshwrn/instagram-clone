import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import Styles from '../../styles/profile/profile__feed.module.css';

const ProfileFeed = ({
  firestore,
  match,
  newPost,
  setLoading,
  loading,
  loaded,
  setNoPosts,
  noPosts,
}) => {
  const [profileFeed, setProfileFeed] = useState([]);
  const [loads, setLoads] = useState(0);

  //+ get the feed after a new post
  useEffect(() => {
    return getFeed();
  }, [newPost]);

  useEffect(() => {
    getFeed();
    setLoads(0);
  }, [match]);

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
      .orderBy('date', 'desc')
      .limit(9)
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
      setNoPosts(true);
    }
  };

  return (
    <>
      {!noPosts ? (
        <div className={Styles.feed}>
          {profileFeed.map((item) => {
            return (
              <ProfileCard
                key={item.id}
                src={item.data().src}
                match={match}
                postId={item.id}
                likes={item.data().likes}
                comments={item.data().comments}
                handleLoad={handleLoad}
                loaded={loaded}
              />
            );
          })}
        </div>
      ) : (
        <div className={Styles.outer}>
          <div className={Styles.notFound}>
            <div className={Styles.notFoundContainer}>
              <button className={Styles.notFoundButton}>No Posts</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileFeed;
