import React from 'react';
import Styles from '../../styles/messages/messagesContact.module.css';

const MessagesContact = () => {
  return (
    <div className={Styles.container}>
      <img
        className={Styles.avatar}
        src="https://i.pinimg.com/564x/9c/8e/92/9c8e9263fd13dbbfba7a02a8fe79715c.jpg"
        alt=""
      />
      <div className={Styles.contactInfo}>
        <p className={Styles.name}>Snoop Dogg</p>
        <p className={Styles.message}>Yo</p>
      </div>
    </div>
  );
};

export default MessagesContact;
