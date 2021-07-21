import React, { useEffect, useState } from 'react';
import MessagesContact from './MessagesContact';
import MessageItem from './MessageItem';
import Styles from '../../styles/messages/messages.module.css';
import { useAuth } from '../../contexts/AuthContext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IoSendOutline } from 'react-icons/io5';

const Messages = () => {
  const { userProfile } = useAuth();

  useEffect(() => {
    console.log(userProfile);
  }, []);

  return (
    <div className={Styles.messages}>
      <div className={Styles.navBg}></div>
      <div className={Styles.sidebar}>
        <div className={Styles.header}>
          <div className={Styles.userAvatarContainer}>
            <img className={Styles.userAvatar} src={userProfile?.profilePhoto} alt="avatar" />
            <img className={Styles.userAvatarBlur} src={userProfile?.profilePhoto} alt="avatar" />
          </div>
          <p className={Styles.headerTitle}>Messages</p>
          <MoreHorizIcon />
        </div>
        <div className={Styles.contactsContainer}>
          {/* map over messages */}
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
          <MessagesContact />
        </div>
      </div>
      <div className={Styles.main}>
        {/* arranged in reverse because of flex direction */}
        <div className={Styles.messageBox}>
          <form className={Styles.messageForm}>
            <input
              className={Styles.input}
              type="text"
              maxLength="500"
              minLength="1"
              placeholder="New Message..."
            />
          </form>
          <IoSendOutline type="submit" className={Styles.send} />
        </div>
        <div id="msg" className={Styles.messageArea}>
          <div className={Styles.overlay}></div>
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={false} />
          <MessageItem sentStatus={false} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={false} />
          <MessageItem sentStatus={false} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={false} />
          <MessageItem sentStatus={false} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={true} />
          <MessageItem sentStatus={false} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
