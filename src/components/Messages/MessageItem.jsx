import React, { useState, useEffect } from 'react';
import Styles from '../../styles/messages/message__item.module.css';

const MessageItem = (sentStatus) => {
  const [sent, setSent] = useState(false);
  return (
    <div className={sentStatus.sentStatus ? Styles.itemSent : Styles.item}>
      <div className={sentStatus.sentStatus ? Styles.bubbleSent : Styles.bubble}>
        <p>hey whats up</p>
      </div>
    </div>
  );
};

export default MessageItem;
