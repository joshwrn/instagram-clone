import React, { useEffect, useState, useRef } from 'react';
import Card from './HomeCard.jsx';
import Styles from '../../styles/home/home__feed.module.css';
import { firestore } from '../../services/firebase.js';
import { useAuth } from '../../contexts/AuthContext';

const HomeFeed = ({ newPost }) => {
  const { userProfile } = useAuth();
  const [stored, setStored] = useState([]);
  const [feed, setFeed] = useState([]);
  const [lastUser, setLastUser] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [noPosts, setNoPosts] = useState(false);
  const noPostsRef = useRef(false);
  const dummyRef = useRef();

  // get followed users on load
  useEffect(() => {
    if (userProfile) {
      getFollowed();
    }
  }, [userProfile]);

  //+ on upload
  useEffect(async () => {
    if (newPost === 0) return;
    let temp = [];
    const next = await firestore
      .collection('users')
      .doc(userProfile.userID)
      .collection('posts')
      .orderBy('date', 'desc')
      .limit(1)
      .get();
    if (!next) return;
    next.forEach((post) => {
      temp.push(post);
    });
    console.log(temp);
    const combine = [...temp, ...feed];
    setFeed(combine);
    window.scrollTo(0, 0);
  }, [newPost]);

  //+ Scroll functionality

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          if (noPostsRef.current === false) {
            setIsFetching(true);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    if (dummyRef.current) {
      observer.observe(dummyRef.current);
    }
  }, [dummyRef]);

  //# decide from local or firestore
  useEffect(() => {
    if (!isFetching) return;
    if (feed.length === stored.length) {
      getMore();
    } else {
      createFeed();
    }
  }, [isFetching]);

  //# after feed updates set load to false
  useEffect(() => {
    setIsFetching(false);
  }, [feed]);

  //+ GET more from storage
  const createFeed = () => {
    const sliced = stored.slice(feed.length, feed.length + 2);
    const combine = [...feed, ...sliced];
    setFeed(combine);
  };

  //+ when storage is updated set the feed
  useEffect(() => {
    createFeed();
  }, [stored]);

  //@ get followed users posts
  const getFollowed = async () => {
    const sort = await firestoreFunction('first');
    //add to stored posts
    setStored(sort);
  };

  //@ get more posts on scroll
  const getMore = async () => {
    // if no more users return
    if (!lastUser) {
      setIsFetching(false);
      return;
    }
    const sort = await firestoreFunction('infinite');
    if (!sort) return;
    const combine = [...stored, ...sort];
    setStored(combine);
  };

  //# firestore
  const firestoreFunction = async (type) => {
    let following = [];
    let userRef;

    if (type === 'first') {
      following.push(userProfile);
      // get followed users in last post order
      userRef = await firestore
        .collection('users')
        .where('followers', 'array-contains', userProfile.userID)
        .orderBy('lastPostDate', 'desc')
        .limit(1)
        .get();
    } else if (type === 'infinite') {
      userRef = await firestore
        .collection('users')
        .where('followers', 'array-contains', userProfile.userID)
        .orderBy('lastPostDate', 'desc')
        .startAfter(lastUser)
        .limit(1)
        .get();
    }

    userRef.forEach((user) => {
      following.push(user.data());
    });

    if (!userRef.docs[userRef.docs.length - 1]) {
      setIsFetching(false);
      setNoPosts(true);
      noPostsRef.current = true;
      return;
    } // set last user fetched
    setLastUser(userRef.docs[userRef.docs.length - 1]);

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

    //await all posts from users
    const postsArr = await Promise.all(promises);

    // push all the posts to a new array
    let temp = [];
    postsArr.forEach((arr) => {
      arr.forEach((post) => {
        temp.push(post);
      });
    });

    // sort all the posts by date
    const sort = temp.sort((a, b) => b.data().date - a.data().date);
    return sort;
  };

  return (
    <div className={Styles.container}>
      {feed.map((post) => {
        return <Card key={post.id} post={post} />;
      })}

      <div ref={dummyRef} className={`${Styles.loaderContainer}`}>
        {isFetching && <div className="loader"></div>}
        {noPosts && <div className={Styles.noPosts}>No More Posts</div>}
      </div>
    </div>
  );
};

export default HomeFeed;
