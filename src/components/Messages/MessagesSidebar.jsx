import React, { useState, useEffect, useRef } from 'react';
import MessagesContact from './MessagesContact';
import { IoCreateOutline, IoChevronBackOutline } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../services/firebase';
import { Link } from 'react-router-dom';
import useIntersect from '../../hooks/useIntersect';

const MessagesSidebar = ({
  Styles,
  messages,
  getCurrentMessage,
  currentIndex,
  scrollToBottom,
  handleCreate,
  setMessages,
  lastContact,
  setLastContact,
}) => {
  const [sidebar, setSidebar] = useState(true);

  const { userProfile } = useAuth();
  const contactRef = useRef();
  const [isFetching, setIsFetching] = useIntersect(contactRef);

  //! MOBILE Sidebar
  const handleSidebar = () => {
    sidebar ? setSidebar(false) : setSidebar(true);
    scrollToBottom();
  };

  useEffect(() => {
    if (!isFetching) return;
    getMore();
  }, [isFetching]);

  useEffect(() => {
    setIsFetching(false);
  }, [messages]);

  const getMore = async () => {
    console.log(lastContact);
    if (!lastContact) return;
    let temp = [];
    const arr = await firestore
      .collection('users')
      .doc(userProfile?.userID)
      .collection('messages')
      .orderBy('time', 'desc')
      .startAfter(lastContact)
      .limit(5)
      .get();

    arr.forEach((doc) => {
      temp.push(doc.data());
    });
    setLastContact(arr.docs[arr.docs.length - 1]);
    const combine = [...messages, ...temp];

    setMessages(combine);
  };

  return (
    <div className={sidebar ? Styles.sidebar : `${Styles.sidebar} ${Styles.hide}`}>
      <div className={Styles.header}>
        <div
          className={
            sidebar ? Styles.userAvatarContainer : `${Styles.userAvatarContainer} ${Styles.remove}`
          }
        >
          <Link to={`/profile/${userProfile?.userID}`}>
            <img className={Styles.userAvatar} src={userProfile?.profilePhoto} alt="avatar" />
            <img className={Styles.userAvatarBlur} src={userProfile?.profilePhoto} alt="avatar" />
          </Link>
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
        <div ref={contactRef}></div>
      </div>
    </div>
  );
};

export default MessagesSidebar;
