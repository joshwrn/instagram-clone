import React, { useEffect, useState, useRef } from 'react';

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
  const [lastContact, setLastContact] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [createModal, setCreateModal] = useState(false);
  const { userProfile } = useAuth();
  const dummyRef = useRef(null);
  const contactRef = useRef();

  useEffect(() => {
    if (match && messages) {
      const check = messages.some((item) => item.user === match.params.uid);
      if (!check) {
        setMessages([{ user: match.params.uid, time: Date.now(), messages: [] }, ...messages]);
      } else {
        const index = messages.findIndex((item) => item.user === match.params.uid);
        getCurrentMessage(index);
      }
    }
  }, [messages, match]);

  const getCurrentMessage = (num) => {
    setCurrentIndex(num);
    setCurrentMessage(messages[num]);
    listen(userProfile.userID, messages[num].user);
  };

  const listen = async (user, message) => {
    console.log('listen');
    firestore
      .collection('users')
      .doc(user)
      .collection('messages')
      .doc(message)
      .onSnapshot((doc) => {
        setCurrentMessage(doc.data());
        scrollToBottom('smooth');
      });
  };

  const scrollToBottom = (type) => {
    type === 'smooth'
      ? dummyRef.current?.scrollIntoView({ behavior: 'smooth' })
      : dummyRef.current?.scrollIntoView();
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createModal ? setCreateModal(false) : setCreateModal(true);
  };

  useEffect(() => {
    getInitial();
  }, [userProfile]);

  const getInitial = async () => {
    if (!userProfile) return;
    let temp = [];
    const arr = await firestore
      .collection('users')
      .doc(userProfile.userID)
      .collection('messages')
      .orderBy('time', 'desc')
      .limit(10)
      .get();

    arr.forEach((doc) => {
      temp.push(doc.data());
    });
    console.log(arr.docs[arr.docs.length - 1]);
    setLastContact(arr.docs[arr.docs.length - 1]);

    setMessages(temp);
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
          currentMessage={currentMessage}
          setCurrentIndex={setCurrentIndex}
          getCurrentMessage={getCurrentMessage}
        />
      )}
      <div className={Styles.navBg}></div>
      {/*//+ sidebar */}
      <MessagesSidebar
        Styles={Styles}
        messages={messages}
        currentIndex={currentIndex}
        getCurrentMessage={getCurrentMessage}
        scrollToBottom={scrollToBottom}
        handleCreate={handleCreate}
        contactRef={contactRef}
        setMessages={setMessages}
        lastContact={lastContact}
        setLastContact={setLastContact}
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
          setCurrentMessage={setCurrentMessage}
          Styles={Styles}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          match={match}
          messages={messages}
          setMessages={setMessages}
          scrollToBottom={scrollToBottom}
          getCurrentMessage={getCurrentMessage}
        />
      </div>
    </div>
  );
};

export default Messages;
