import React, { useEffect, useState, useRef } from 'react';

import MessagesCreateMenu from './MessagesCreateMenu';
import Styles from '../../styles/messages/messages.module.css';
import { useAuth } from '../../contexts/AuthContext';

import MessageArea from './MessageArea';
import MessageInputBox from './MessageInputBox';
import MessagesSidebar from './MessagesSidebar';

const Messages = ({ match }) => {
  const { userProfile } = useAuth();
  const dummyRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState();
  const [currentProfile, setCurrentProfile] = useState();

  const [currentIndex, setCurrentIndex] = useState();

  const [createModal, setCreateModal] = useState(false);

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
        />
      </div>
    </div>
  );
};

export default Messages;
