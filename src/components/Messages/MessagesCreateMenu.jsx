import React from 'react';
import Styles from '../../styles/messages/messages__create-menu.module.css';
import MessagesCreateMenuItem from './MessagesCreateMenuItem';
import { IoCloseOutline } from 'react-icons/io5';

const MessagesCreateMenu = ({
  handleCreate,
  userProfile,
  setMessages,
  messages,
  setCurrentMessage,
  currentMessage,
  setCurrentIndex,
  getCurrentMessage,
}) => {
  return (
    <div className={Styles.modal}>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <h3>New Message</h3>
          <IoCloseOutline onClick={handleCreate} className={Styles.close} />
        </div>

        {/*//+ list of following is here */}
        <div className={Styles.listContainer}>
          {userProfile?.following.map((item) => {
            return (
              <MessagesCreateMenuItem
                messages={messages}
                setMessages={setMessages}
                Styles={Styles}
                contactID={item}
                setCurrentMessage={setCurrentMessage}
                handleCreate={handleCreate}
                setCurrentIndex={setCurrentIndex}
                getCurrentMessage={getCurrentMessage}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessagesCreateMenu;
