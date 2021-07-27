import React, { useEffect, useState } from 'react';
import Card from './HomeCard.jsx';
import Styles from '../../styles/home/home__feed.module.css';
import { firestore } from '../../services/firebase.js';
import { useAuth } from '../../contexts/AuthContext';

const HomeFeed = () => {
  const { userProfile } = useAuth();
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    if (userProfile) {
      getFollowed();
    }
  }, [userProfile]);

  const getFollowed = async () => {
    let following = [userProfile];

    // get followed users in last post order
    const userRef = await firestore
      .collection('users')
      .where('followers', 'array-contains', userProfile.userID)
      .orderBy('lastPostDate', 'desc')
      .limit(10)
      .get();
    userRef.forEach((user) => {
      following.push(user.data());
    });

    // map over each user and get their latest posts
    const promises = following.map(async (user) => {
      const postRef = await firestore
        .collection('users')
        .doc(user.userID)
        .collection('posts')
        .orderBy('date', 'desc')
        .limit(5)
        .get();
      return postRef;
    });

    const postsArr = await Promise.all(promises);

    // takes array of post arrays and pushes each post from each array into a single array
    let temp = [];
    postsArr.forEach((arr) => {
      arr.forEach((post) => {
        temp.push(post);
      });
    });

    // sort all the posts by date
    const sort = temp.sort((a, b) => b.data().date - a.data().date);
    setFeed(sort);
  };

  return (
    <div className={Styles.container}>
      {feed.map((post) => {
        return <Card key={post.id} post={post} />;
      })}
    </div>
  );
};

export default HomeFeed;
