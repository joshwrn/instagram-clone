import React, { useState, useEffect, useRef } from 'react';
import Styles from '../../styles/messages/messages__create-menu.module.css';
import MessagesCreateMenuItem from './MessagesCreateMenuItem';
import { IoCloseOutline } from 'react-icons/io5';

const MessagesCreateMenu = ({
  handleCreate,
  userProfile,
  setMessages,
  messages,
  setCurrentMessage,
  setCurrentIndex,
  getCurrentMessage,
}) => {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          setIsFetching(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  useEffect(() => {
    if (!userProfile) return;
    createInitial();
  }, [userProfile]);

  useEffect(() => {
    if (!isFetching) return;
    createMore();
  }, [isFetching]);

  useEffect(() => {
    setIsFetching(false);
  }, [list]);

  const createInitial = () => {
    if (!userProfile) return;
    const { following } = userProfile;
    const reverse = following.slice(0).reverse();
    const sliced = reverse.slice(0, 10);
    setList(sliced);
  };

  //+ GET more from storage
  const createMore = () => {
    if (!userProfile) return;
    const { following } = userProfile;
    if (following.length === list.length) return;

    const reverse = following.slice(0).reverse();
    const sliced = reverse.slice(list.length, list.length + 10);

    const combine = [...list, ...sliced];
    setList(combine);
  };

  return (
    <div className={Styles.modal}>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <h3>New Message</h3>
          <IoCloseOutline onClick={handleCreate} className={Styles.close} />
        </div>

        {/*//+ list of following is here */}
        <div className={Styles.listContainer}>
          {list.map((item) => {
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
          <div ref={ref}></div>
        </div>
      </div>
    </div>
  );
};

export default MessagesCreateMenu;
