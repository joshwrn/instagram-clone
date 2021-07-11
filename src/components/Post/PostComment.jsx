import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from '../../styles/post/post__comment-section.module.css';
import { firestore } from '../../services/firebase';

const PostComment = ({ comment, user }) => {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userRef = firestore.collection('users').doc(user);
      const thisUser = await userRef.get();
      setCurrent(thisUser.data());
    };
    getUser();
  }, []);

  return (
    <div className={Styles.commentContainer}>
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
  );
};

export default PostComment;
