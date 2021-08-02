import React, { useEffect, useState, useRef, useCallback } from 'react';

import MessagesCreateMenu from './MessagesCreateMenu';
import Styles from '../../styles/messages/messages.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../services/firebase';
import MessageArea from './MessageArea';
import MessageInputBox from './MessageInputBox';
import MessagesSidebar from './MessagesSidebar';

const Messages = ({ match }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [createModal, setCreateModal] = useState(false);
  const { userProfile } = useAuth();
  const dummyRef = useRef(null);
  const subRef = useRef();

  const scrollToBottom = (type) => {
    type === 'smooth'
      ? dummyRef.current?.scrollIntoView({ behavior: 'smooth' })
      : dummyRef.current?.scrollIntoView();
  };

  const listener = useCallback(() => {
    return firestore
      .collection('users')
      .doc(userProfile?.userID)
      .collection('messages')
      .orderBy('time', 'desc')
      .onSnapshot((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
        setMessages(temp);
        scrollToBottom('smooth');
      });
  }, [userProfile]);

  useEffect(() => {
    let unsubscribe = listener();
    return () => {
      unsubscribe();
    };
  }, []);

  const getCurrentMessage = (num) => {
    setCurrentIndex(num);
    setCurrentMessage(messages[num]);
    scrollToBottom();
  };

  // creating messages from profile
  useEffect(() => {
    if (match && messages && messages.length > 0) {
      const check = messages.some((item) => item.user === match.params.uid);
      if (!check) {
        setMessages([{ user: match.params.uid, time: Date.now(), messages: [] }, ...messages]);
      } else {
        const index = messages.findIndex((item) => item.user === match.params.uid);
        getCurrentMessage(index);
      }
    }
  }, [messages, match]);

  // on message update decide where
  useEffect(() => {
    if (!match) {
      if (!currentMessage && messages && userProfile) {
        setCurrentMessage(messages[0]);
        setCurrentIndex(0);
        getCurrentMessage(0);
      } else if (currentMessage) {
        setCurrentMessage(messages[currentIndex]);
      }
      if (messages[0]?.messages?.length === 0) {
        getCurrentMessage(0);
      }
    }
  }, [messages]);

  useEffect(() => {
    subRef.current = userProfile?.userID;
  }, [userProfile]);

  const handleCreate = (e) => {
    e.preventDefault();
    createModal ? setCreateModal(false) : setCreateModal(true);
  };

  return (
    <div className={Styles.messages}>
      {/*//+ create message menu */}
      {createModal && (
        <MessagesCreateMenu
          messages={messages}
          setMessages={setMessages}
          setCurrentMessage={setCurrentMessage}
          userProfile={userProfile}
          handleCreate={handleCreate}
          setCurrentIndex={setCurrentIndex}
          getCurrentMessage={getCurrentMessage}
        />
      )}
      <div className={Styles.navBg} />
      {/*//+ sidebar */}
      <MessagesSidebar
        Styles={Styles}
        messages={messages}
        currentIndex={currentIndex}
        getCurrentMessage={getCurrentMessage}
        scrollToBottom={scrollToBottom}
        handleCreate={handleCreate}
      />
      {/*//+ input */}
      <div className={Styles.main}>
        <MessageInputBox
          currentMessage={currentMessage}
          currentProfile={currentProfile}
          setCurrentIndex={setCurrentIndex}
          Styles={Styles}
        />
        {/*//+ messages section */}
        <MessageArea
          currentProfile={currentProfile}
          setCurrentProfile={setCurrentProfile}
          currentMessage={currentMessage}
          Styles={Styles}
          dummyRef={dummyRef}
        />
      </div>
    </div>
  );
};

export default Messages;
