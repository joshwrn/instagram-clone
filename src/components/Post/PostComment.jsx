import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from '../../styles/post/post__comment-section.module.css';
import { firestore } from '../../services/firebase';
import convertTime from '../../functions/convertTime';

const PostComment = ({ comment, user, time }) => {
  const [current, setCurrent] = useState(null);
  const [addTime, setAddTime] = useState();

  useEffect(() => {
    const getUser = async () => {
      const userRef = firestore.collection('users').doc(user);
      const thisUser = await userRef.get();
      setCurrent(thisUser.data());
    };
    getUser();
    getTime();
  }, []);

  const getTime = () => {
    const currentTime = Date.now();
    const converted = convertTime(time, currentTime);
    setAddTime(converted);
  };

  return (
    <div className={Styles.commentContainer}>
      <div className={Styles.start}>
        <Link to={`/profile/${user}`}>
          <img className={Styles.avatar} src={current?.profilePhoto} alt="" />
        </Link>
        <p className={Styles.comment}>
          <span className={Styles.user}>
            <Link to={`/profile/${user}`}>{current?.displayName} </Link>
          </span>
          {comment}
        </p>
      </div>
      <p className={Styles.time}>{addTime}</p>
    </div>
  );
};

export default PostComment;
