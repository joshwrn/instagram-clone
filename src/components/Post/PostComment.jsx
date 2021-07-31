import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from '../../styles/post/post__comment-section.module.css';
import { firestore } from '../../services/firebase';
import convertTime from '../../functions/convertTime';
import ImageLoader from '../reusable/ImageLoader';

const PostComment = ({ comment, user, time }) => {
  const [current, setCurrent] = useState(null);
  const [addTime, setAddTime] = useState();

  const getTime = () => {
    const currentTime = Date.now();
    const converted = convertTime(time, currentTime);
    setAddTime(converted);
  };

  useEffect(() => {
    const getUser = async () => {
      const userRef = firestore.collection('users').doc(user);
      const thisUser = await userRef.get();
      setCurrent(thisUser.data());
    };
    getUser();
    getTime();
  }, []);

  return (
    <div className={Styles.commentContainer}>
      <div className={Styles.start}>
        <Link to={`/profile/${user}`}>
          <ImageLoader src={current?.profilePhoto} width="27px" height="27px" borderRadius="100%" />
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
