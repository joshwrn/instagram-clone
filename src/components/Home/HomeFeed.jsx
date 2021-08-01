import React, { useEffect, useState, useRef } from 'react';
import Card from './HomeCard';
import Styles from '../../styles/home/home__feed.module.css';
import { firestore } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import useIntersect from '../../hooks/useIntersect';

const HomeFeed = ({ newPost }) => {
  const { userProfile } = useAuth();
  const [stored, setStored] = useState([]);
  const [feed, setFeed] = useState([]);
  const [lastUser, setLastUser] = useState();

  const [noPosts, setNoPosts] = useState(false);
  const noPostsRef = useRef(false);
  const dummyRef = useRef();
  const [isFetching, setIsFetching] = useIntersect(dummyRef, noPostsRef);

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
        .limit(5)
        .get();
    } else if (type === 'infinite') {
      // if no user is signed in
      if (!userProfile) {
        setIsFetching(false);
        return setNoPosts(true);
      }
      userRef = await firestore
        .collection('users')
        .where('followers', 'array-contains', userProfile.userID)
        .orderBy('lastPostDate', 'desc')
        .startAfter(lastUser)
        .limit(5)
        .get();
    } else if (type === 'none') {
      const me = await firestore.collection('users').doc('e9x1NbFsE8VqLAqAKfbpHkH0QS93').get();
      following.push(me.data());
      // get people i follow
      userRef = await firestore
        .collection('users')
        .where('followers', 'array-contains', 'e9x1NbFsE8VqLAqAKfbpHkH0QS93')
        .orderBy('lastPostDate', 'desc')
        .limit(10)
        .get();
    }

    userRef.forEach((user) => {
      following.push(user.data());
    });

    if (type === 'infinite' && !userRef.docs[userRef.docs.length - 1]) {
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

  //! get none
  const getNone = async () => {
    const sort = await firestoreFunction('none');
    //add to stored posts
    setStored(sort);
  };

  //@ get followed users posts
  const getFollowed = async () => {
    const sort = await firestoreFunction('first');
    //add to stored posts
    setStored(sort);
  };

  //+ GET more from storage
  const createFeed = () => {
    if (!stored) return;
    const sliced = stored.slice(feed.length, feed.length + 2);
    const combine = [...feed, ...sliced];
    setFeed(combine);
  };

  //+ when storage is updated set the feed
  useEffect(() => {
    createFeed();
  }, [stored]);

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

  // get followed users on load
  useEffect(() => {
    if (userProfile) {
      getFollowed();
    } else {
      getNone();
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
    const combine = [...temp, ...feed];
    setFeed(combine);
    window.scrollTo(0, 0);
  }, [newPost]);

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

  return (
    <div className={Styles.container}>
      {feed.map((post) => {
        return <Card key={post.id} post={post} />;
      })}

      <div ref={dummyRef} className={`${Styles.loaderContainer}`}>
        {isFetching && <div className="loader" />}
        {noPosts && <div className={Styles.noPosts}>No More Posts</div>}
      </div>
    </div>
  );
};

export default HomeFeed;
