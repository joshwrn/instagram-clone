import React, { useState, useEffect } from 'react';
import PostComment from './PostComment';
import Styles from '../../styles/post/post__comment-section.module.css';

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
          <div className="post__comment__container">
            <div className="post__comment__profile-img-loading" />
            <div className="comment-loading"></div>
          </div>
          <div className="post__comment__container">
            <div className="post__comment__profile-img-loading" />
            <div className="comment-loading"></div>
          </div>
          <div className="post__comment__container">
            <div className="post__comment__profile-img-loading" />
            <div className="comment-loading"></div>
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
