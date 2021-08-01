import React, { useState } from 'react';
import { IoSendOutline } from 'react-icons/io5';
import { firestore, firestoreFieldValue } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';

const MessageInputBox = ({ currentMessage, currentProfile, Styles, setCurrentIndex }) => {
  const [inputBox, setInputBox] = useState('');
  const { userProfile } = useAuth();
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

  return (
    <div className={Styles.messageBox}>
      {/* arranged in reverse because of flex direction */}
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
  );
};

export default MessageInputBox;
