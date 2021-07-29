import React, { useEffect, useState, useRef } from 'react';
import MessagesContact from './MessagesContact';
import MessageItem from './MessageItem';
import MessagesCreateMenu from './MessagesCreateMenu';
import Styles from '../../styles/messages/messages.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { IoSendOutline, IoCreateOutline, IoChevronBackOutline } from 'react-icons/io5';
import { firestore, firestoreFieldValue } from '../../services/firebase';
import debounce from '../../functions/debounce.js';

const Messages = ({ match }) => {
  const { userProfile } = useAuth();
  const dummyRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [thread, setThread] = useState([]);

  const [inputBox, setInputBox] = useState('');
  const [currentIndex, setCurrentIndex] = useState();

  const [createModal, setCreateModal] = useState(false);
  const [sidebar, setSidebar] = useState(true);

  const [lastUser, setLastUser] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [noMessages, setNoMessages] = useState(false);
  const noMessagesRef = useRef(false);
  const topRef = useRef();

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

  useEffect(() => {
    return listen();
  }, [userProfile]);

  useEffect(() => {
    if (!match) {
      if (!currentMessage) {
        setCurrentMessage(messages[0]);
      } else if (currentMessage) {
        setCurrentMessage(messages[currentIndex]);
      }
      if (messages[0]?.messages?.length === 0) {
        getCurrentMessage(0);
      }
    }
  }, [messages]);

  const getCurrentMessage = (num) => {
    setCurrentIndex(num);
    setCurrentMessage(messages[num]);
  };

  //> Scroll functionality

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          if (noMessagesRef.current === false) {
            console.log('interecting');
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
    if (topRef.current) {
      observer.observe(topRef.current);
    }
  }, [topRef]);

  //+ GET more from storage
  const createFeed = () => {
    if (!currentMessage) return;
    if (currentMessage.messages.length === thread.length) return setNoMessages(true);
    const sliced = currentMessage.messages.slice(thread.length, thread.length + 20);
    const combine = [...thread, ...sliced];
    setThread(combine);
  };

  useEffect(() => {
    if (!isFetching || noMessages) return;
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

  //> END SCROLL

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
        scrollToBottom('smooth');
      });
  };

  const setSnap = (arr) => {
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

  //! MOBILE Sidebar
  const handleSidebar = () => {
    sidebar ? setSidebar(false) : setSidebar(true);
    scrollToBottom();
  };

  const scrollToBottom = (type) => {
    type === 'smooth'
      ? dummyRef.current?.scrollIntoView({ behavior: 'smooth' })
      : dummyRef.current?.scrollIntoView();
  };

  //+ send

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = Date.now();
    if (currentProfile) {
      if (inputBox.length > 0 && inputBox.length < 501) {
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
              message: inputBox,
              time: time,
            }),
          });
        };

        const addContactThread = () => {
          contactThread.update({
            messages: firestoreFieldValue.arrayUnion({
              user: userProfile?.userID,
              message: inputBox,
              time: time,
            }),
          });
        };

        await Promise.all([addUserThread(), addContactThread()]);
        setInputBox('');
        setCurrentIndex(0);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInputBox(value);
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
      <div className={sidebar ? Styles.sidebar : `${Styles.sidebar} ${Styles.hide}`}>
        <div className={Styles.header}>
          <div
            className={
              sidebar
                ? Styles.userAvatarContainer
                : `${Styles.userAvatarContainer} ${Styles.remove}`
            }
          >
            <img className={Styles.userAvatar} src={userProfile?.profilePhoto} alt="avatar" />
            <img className={Styles.userAvatarBlur} src={userProfile?.profilePhoto} alt="avatar" />
          </div>
          {sidebar ? null : (
            <div className={Styles.backArrowContainer}>
              <IoChevronBackOutline onClick={handleSidebar} className={Styles.backArrow} />
            </div>
          )}
          <p className={Styles.headerTitle}>Messages</p>
          <div onClick={handleCreate} className={Styles.createIconContainer}>
            <IoCreateOutline className={Styles.createIcon} />
          </div>
        </div>
        <div
          className={
            sidebar ? Styles.contactsContainer : `${Styles.contactsContainer} ${Styles.hide}`
          }
        >
          {/* map over messages */}
          {messages.map((item, index) => {
            return (
              <MessagesContact
                key={item.time}
                time={item.time}
                index={index}
                user={item.user}
                last={item.messages?.length > 0 ? item.messages[item.messages?.length - 1] : null}
                getCurrentMessage={getCurrentMessage}
                currentIndex={currentIndex}
                handleSidebar={handleSidebar}
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
              value={inputBox}
            />
          </form>
          <IoSendOutline type="submit" onClick={handleSubmit} className={Styles.send} />
        </div>
        {/*//+ messages section */}
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
      </div>
    </div>
  );
};

export default Messages;
