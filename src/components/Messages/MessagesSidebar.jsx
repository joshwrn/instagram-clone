import React, { useState } from 'react';
import { IoCreateOutline, IoChevronBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ImageLoader from '../reusable/ImageLoader';
import MessagesContact from './MessagesContact';

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
          <Link to={`/profile/${userProfile?.userID}`}>
            <ImageLoader
              src={userProfile?.profilePhoto}
              width="65px"
              height="65px"
              borderRadius="100%"
              position="absolute"
            />
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
      </div>
    </div>
  );
};

export default MessagesSidebar;
