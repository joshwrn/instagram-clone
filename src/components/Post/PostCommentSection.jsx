import React, { useState, useEffect, useRef } from 'react';
import PostComment from './PostComment';
import Styles from '../../styles/post/post__comment-section.module.css';
import Loading from '../../styles/post/post__loading.module.css';

const PostCommentSection = ({ loaded, currentPost }) => {
  const [comments, setComments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const ref = useRef();
  const bottomRef = useRef();

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
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  useEffect(() => {
    if (!isFetching) return;
    getMore();
  }, [isFetching]);

  useEffect(() => {
    getComments();
  }, [currentPost]);

  useEffect(() => {
    setIsFetching(false);
  }, [comments]);

  const getComments = () => {
    if (!currentPost) return;
    const reverse = currentPost.comments.slice(0).reverse();
    const sliced = reverse.slice(0, 10);
    setComments(sliced);
  };

  const getMore = () => {
    if (!currentPost) return;
    const reverse = currentPost.comments.slice(0).reverse();
    const sliced = reverse.slice(comments.length, comments.length + 10);
    const combine = [...comments, ...sliced];
    setComments(combine);
  };

  return (
    <div className={Styles.commentsContainer}>
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
              return (
                <PostComment
                  key={item.id}
                  time={item.time}
                  comment={item.comment}
                  user={item.user}
                />
              );
            })}
          </>
        )}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default PostCommentSection;
