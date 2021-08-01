import React, { useRef, useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import MessageItem from './MessageItem';
import useIntersect from '../../hooks/useIntersect';

const MessageArea = ({ currentMessage, currentProfile, setCurrentProfile, Styles, dummyRef }) => {
  const topRef = useRef();
  const [thread, setThread] = useState([]);
  const { userProfile } = useAuth();
  const [isFetching, setIsFetching] = useIntersect(topRef);

  //+ GET more from storage
  const createFeed = () => {
    if (!currentMessage) return;

    const reverse = currentMessage.messages.slice(0).reverse();
    const sliced = reverse.slice(thread.length, thread.length + 20);
    const combine = [...thread, ...sliced];
    setThread(combine);
  };

  useEffect(() => {
    if (!isFetching) return;
    createFeed();
  }, [isFetching]);

  //# after feed updates set load to false
  useEffect(() => {
    setIsFetching(false);
  }, [thread]);

  useEffect(() => {
    if (currentMessage?.messages?.length > 0) {
      const reverse = currentMessage?.messages.slice(0).reverse();
      const sliced = reverse.slice(0, 20);
      setThread(sliced);
    } else {
      setThread([]);
    }
  }, [currentMessage]);

  const getUserObject = () => {
    firestore
      .collection('users')
      .doc(currentMessage?.user)
      .get()
      .then((userData) => {
        if (userData.exists) {
          setCurrentProfile(userData.data());
        }
      });
  };

  useEffect(() => {
    getUserObject();
  }, [currentMessage]);

  return (
    <div id="msg" className={Styles.messageArea}>
      <div ref={dummyRef} className={Styles.dummy} />
      {thread?.map((item, index) => {
        return (
          <MessageItem
            key={item.time}
            time={item.time}
            currentProfile={currentProfile}
            user={item.user}
            thread={thread}
            index={index}
            message={item.message}
            userProfile={userProfile}
          />
        );
      })}
      <div ref={topRef} className={Styles.dummy} />
    </div>
  );
};

export default MessageArea;
