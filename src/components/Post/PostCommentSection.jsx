import React, { useState, useEffect } from 'react';
import PostComment from './PostComment';
import Styles from '../../styles/post/post__comment-section.module.css';
import Loading from '../../styles/post/post__loading.module.css';

const PostCommentSection = ({ loaded, currentPost }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, [currentPost]);

  const getComments = () => {
    let temp = [];
    currentPost?.comments.forEach((element) => {
      temp.push(element);
    });
    setComments(temp);
  };

  return (
    <div className={Styles.comments}>
      {/* <p className="view-all">View All Comments</p> */}
      {!loaded ? (
        <>
          <div className={Styles.commentContainer}>
            <div className={Loading.commentProfile} />
            <div className={Loading.comment}></div>
          </div>
          <div className={Styles.commentContainer}>
            <div className={Loading.commentProfile} />
            <div className={Loading.comment}></div>
          </div>
          <div className={Styles.commentContainer}>
            <div className={Loading.commentProfile} />
            <div className={Loading.comment}></div>
          </div>
        </>
      ) : (
        <>
          {comments.map((item) => {
            return <PostComment key={item.id} comment={item.comment} user={item.user} />;
          })}
        </>
      )}
    </div>
  );
};

export default PostCommentSection;
