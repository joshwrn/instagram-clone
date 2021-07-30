import React, { useState, useEffect, useRef } from 'react';
import ProfileCard from './ProfileCard';
import Styles from '../../styles/profile/profile__feed.module.css';
import useIntersect from '../../hooks/useIntersect';

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
  const [feed, setFeed] = useState([]);
  const [loads, setLoads] = useState(0);
  const [lastPost, setLastPost] = useState();

  const [endFeed, setEndFeed] = useState(false);
  const endFeedRef = useRef(false);

  const dummyRef = useRef();
  const [isFetching, setIsFetching] = useIntersect(dummyRef, endFeedRef);

  // get the feed after a new post
  useEffect(() => {
    return getFeed();
  }, [newPost]);

  useEffect(() => {
    getFeed();
    setLoads(0);
    setEndFeed(false);
    endFeedRef.current = false;
  }, [match]);

  // every time loads complete check the count to see if all the posts match the feed length
  useEffect(() => {
    if (feed.length > 0 && loads === feed.length) {
      setLoading((old) => [...old], {
        [loading[2]]: (loading[2].loading = false),
      });
    }
  }, [loads]);

  // increment up after a image loads
  const handleLoad = () => {
    setLoads((prev) => prev + 1);
  };

  //# after feed updates set load to false
  useEffect(() => {
    setIsFetching(false);
  }, [feed]);

  //# decide from local or firestore
  useEffect(() => {
    if (!isFetching || endFeed) return;
    updateFeed();
  }, [isFetching]);

  const updateFeed = async () => {
    const temp = await getMore();
    if (!temp) return;
    const combine = [...feed, ...temp];
    setFeed(combine);
  };

  //! get the feed
  const getFeed = async () => {
    const temp = await getInitial();
    setFeed(temp);
    //+ if theres no posts set loading to false
    if (temp.length === 0) {
      setLoading((old) => [...old], {
        [loading[2]]: (loading[2].loading = false),
      });
      setNoPosts(true);
    }
  };

  const getMore = async () => {
    let temp = [];
    console.log('get more');
    if (!lastPost) return;
    const snap = await firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .orderBy('date', 'desc')
      .startAfter(lastPost)
      .limit(8)
      .get();
    await snap.forEach((doc) => {
      doc.complete = false;
      temp.push(doc);
    });
    if (!snap.docs[snap.docs.length - 1]) {
      setIsFetching(false);
      setEndFeed(true);
      endFeedRef.current = true;
      return;
    }
    setLastPost(snap.docs[snap.docs.length - 1]);
    return temp;
  };

  const getInitial = async () => {
    let temp = [];
    const snap = await firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .orderBy('date', 'desc')
      .limit(8)
      .get();
    await snap.forEach((doc) => {
      doc.complete = false;
      temp.push(doc);
    });
    setLastPost(snap.docs[snap.docs.length - 1]);
    return temp;
  };

  return (
    <>
      {!noPosts ? (
        <div className={Styles.feedContainer}>
          <div className={Styles.feed}>
            {feed.map((item) => {
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
          <div ref={dummyRef} className={`${Styles.loaderContainer}`}>
            {isFetching && <div className="loader"></div>}
            {endFeed && feed.length > 6 ? (
              <div className={Styles.endFeed}>No More Posts</div>
            ) : null}
          </div>
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
