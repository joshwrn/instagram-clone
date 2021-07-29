import React, { useState, useEffect } from 'react';
import MessagesContact from './MessagesContact';
import { IoCreateOutline, IoChevronBackOutline } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';

const MessagesSidebar = ({
  Styles,
  messages,
  getCurrentMessage,
  currentIndex,
  scrollToBottom,
  handleCreate,
}) => {
  const [sidebar, setSidebar] = useState(true);
  const { userProfile } = useAuth();

  //! MOBILE Sidebar
  const handleSidebar = () => {
    sidebar ? setSidebar(false) : setSidebar(true);
    scrollToBottom();
  };

  return (
    <div className={sidebar ? Styles.sidebar : `${Styles.sidebar} ${Styles.hide}`}>
      <div className={Styles.header}>
        <div
          className={
            sidebar ? Styles.userAvatarContainer : `${Styles.userAvatarContainer} ${Styles.remove}`
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
  );
};

export default MessagesSidebar;
