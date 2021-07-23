import React, { useEffect, useState } from 'react';
import MessagesContact from './MessagesContact';
import MessageItem from './MessageItem';
import MessagesCreateMenu from './MessagesCreateMenu';
import Styles from '../../styles/messages/messages.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { IoSendOutline, IoCreateOutline } from 'react-icons/io5';
import { firestore, firestoreFieldValue } from '../../services/firebase';

const Messages = () => {
  const { userProfile } = useAuth();

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [thread, setThread] = useState([]);

  const [input, setInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState();

  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    listen();
  }, [userProfile]);

  useEffect(() => {
    console.log('current', currentMessage);
    if (currentMessage) {
      console.log('set current message from messages');
      setCurrentMessage(messages[currentIndex]);
    }
    if (messages[0]?.messages?.length === 0) {
      getCurrentMessage(0);
    }
  }, [messages]);

  const getCurrentMessage = (num) => {
    setCurrentIndex(num);
    setCurrentMessage(messages[num]);
  };

  useEffect(() => {
    currentMessage?.messages?.length > 0
      ? setThread(currentMessage?.messages.slice(0).reverse())
      : setThread([]);
    console.log('thread current', currentMessage);
  }, [currentMessage]);

  useEffect(() => {
    getUserObject();
  }, [currentMessage]);

  const listen = async () => {
    const snap = firestore
      .collection('users')
      .doc(userProfile?.userID)
      .collection('messages')
      .orderBy('time', 'desc')
      .onSnapshot((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
        setSnap(temp);
      });
  };

  const setSnap = (arr) => {
    console.log('temp:', arr);
    setMessages(arr);
  };

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

  //+ send

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = Date.now();
    if (currentProfile) {
      if (input.length > 0 && input.length < 501) {
        const contactThread = firestore
          .collection('users')
          .doc(currentMessage?.user)
          .collection('messages')
          .doc(userProfile?.userID);

        const userThread = firestore
          .collection('users')
          .doc(userProfile?.userID)
          .collection('messages')
          .doc(currentMessage?.user);

        await userThread.set(
          {
            time: time,
            user: currentProfile.userID,
          },
          { merge: true }
        );

        await contactThread.set(
          {
            time: time,
            user: userProfile?.userID,
          },
          { merge: true }
        );
        //@ add message to thread
        const addUserThread = () => {
          userThread.update({
            messages: firestoreFieldValue.arrayUnion({
              user: userProfile?.userID,
              message: input,
              time: time,
            }),
          });
        };

        const addContactThread = () => {
          contactThread.update({
            messages: firestoreFieldValue.arrayUnion({
              user: userProfile?.userID,
              message: input,
              time: time,
            }),
          });
        };

        await Promise.all([addUserThread(), addContactThread()]);
        setInput('');
        setCurrentIndex(0);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInput(value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createModal ? setCreateModal(false) : setCreateModal(true);
  };

  return (
    <div className={Styles.messages}>
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
      <div className={Styles.sidebar}>
        <div className={Styles.header}>
          <div className={Styles.userAvatarContainer}>
            <img className={Styles.userAvatar} src={userProfile?.profilePhoto} alt="avatar" />
            <img className={Styles.userAvatarBlur} src={userProfile?.profilePhoto} alt="avatar" />
          </div>
          <p className={Styles.headerTitle}>Messages</p>
          <div onClick={handleCreate} className={Styles.createIconContainer}>
            <IoCreateOutline className={Styles.createIcon} />
          </div>
        </div>
        <div className={Styles.contactsContainer}>
          {/* map over messages */}
          {messages.map((item, index) => {
            return (
              <MessagesContact
                key={item.time}
                index={index}
                user={item.user}
                last={item.messages?.length > 0 ? item.messages[item.messages?.length - 1] : null}
                getCurrentMessage={getCurrentMessage}
                currentIndex={currentIndex}
              />
            );
          })}
        </div>
      </div>
      <div className={Styles.main}>
        {/* arranged in reverse because of flex direction */}
        <div className={Styles.messageBox}>
          <form onSubmit={handleSubmit} className={Styles.messageForm}>
            <input
              className={Styles.input}
              type="text"
              maxLength="500"
              minLength="1"
              placeholder="New Message..."
              onChange={handleChange}
              value={input}
            />
          </form>
          <IoSendOutline type="submit" onClick={handleSubmit} className={Styles.send} />
        </div>
        <div id="msg" className={Styles.messageArea}>
          <div className={Styles.overlay}></div>
          {thread?.map((item, index, array) => {
            return (
              <MessageItem
                key={item.time}
                currentProfile={currentProfile}
                user={item.user}
                thread={thread}
                index={index}
                message={item.message}
                userProfile={userProfile}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Messages;
