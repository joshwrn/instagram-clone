import React, { useState, useEffect } from 'react';
import Styles from '../../styles/messages/message__item.module.css';

const MessageItem = (sentStatus) => {
  const [sent, setSent] = useState(false);
  return (
    <div className={sentStatus.sentStatus ? Styles.itemSent : Styles.item}>
      <div className={sentStatus.sentStatus ? Styles.bubbleSent : Styles.bubble}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
