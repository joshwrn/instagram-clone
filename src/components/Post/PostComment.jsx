import React from 'react';
import { Link } from 'react-router-dom';
import Styles from '../../styles/post/post__comment-section.module.css';

const PostComment = ({ avatar, comment, user, name }) => {
  return (
    <div className={Styles.commentContainer}>
      <Link to={`/profile/${user}`}>
        <img className={Styles.avatar} src={avatar} alt="" />
      </Link>
      <p className={Styles.comment}>
        <span className={Styles.user}>
          <Link to={`/profile/${user}`}>{name} </Link>
        </span>
        {comment}
      </p>
    </div>
  );
};

export default PostComment;
