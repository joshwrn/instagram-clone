import React, { useRef, useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import MessageItem from './MessageItem';

const MessageArea = ({
  currentMessage,
  setCurrentMessage,
  currentProfile,
  setCurrentProfile,
  Styles,
  messages,
  setMessages,
  currentIndex,
  getCurrentMessage,
  scrollToBottom,
  setCurrentIndex,
  match,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const topRef = useRef();
  const dummyRef = useRef(null);
  const [thread, setThread] = useState([]);
  const { userProfile } = useAuth();
  // const [isFetching, setIsFetching] = useIntersect(topRef);

  useEffect(() => {
    console.log('fetching');
  }, [isFetching]);

  //> Scroll functionality

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          console.log('interecting');
          setIsFetching(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    if (topRef.current) {
      observer.observe(topRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [topRef]);

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

  useEffect(() => {
    getUserObject();
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

  return (
    <div id="msg" className={Styles.messageArea}>
      <div ref={dummyRef} className={Styles.dummy}></div>
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
      <div ref={topRef} className={Styles.dummy}></div>
    </div>
  );
};

export default MessageArea;
