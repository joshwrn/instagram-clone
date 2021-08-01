import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSendOutline } from 'react-icons/io5';
import HomeCardCommentItem from './HomeCardCommentItem';
import { useAuth } from '../../contexts/AuthContext';
import { firestore, firestoreFieldValue } from '../../services/firebase';

const HomeCardComments = ({ Styles, userID, post }) => {
  const [commentArr, setCommentArr] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const { userProfile } = useAuth();

  useEffect(() => {
    const { comments } = post.data();
    const temp = comments.slice(Math.max(comments.length - 2, 0));
    setCommentArr(temp);
  }, [post]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (userProfile) {
      if (commentInput.length > 0 && commentInput.length < 100) {
        const time = Date.now();
        const commentObject = { time: time, comment: commentInput, user: userProfile.userID };
        const temp = commentArr.slice(Math.max(commentArr.length - 1, 0));
        temp.push(commentObject);

        const thisPost = firestore.collection('users').doc(userID).collection('posts').doc(post.id);
        const thisUser = firestore.collection('users').doc(userID);
        //@ add comment to post
        const addPost = () => {
          thisPost.update({
            comments: firestoreFieldValue.arrayUnion(commentObject),
          });
        };
        const notify = () => {
          thisUser.update({
            notifications: firestoreFieldValue.arrayUnion({
              user: userProfile.userID,
              type: 'comment',
              comment: commentInput,
              post: post.id,
              time: time,
            }),
          });
        };
        await Promise.all([notify(), addPost()]);

        setCommentArr(temp);
        setCommentInput('');
      }
    }
  };

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  return (
    <>
      <div className={Styles.comments}>
        <Link className={Styles.imageLink} to={`/Post/${userID}/${post.id}`}>
          <p className={Styles.viewAll}>
            {commentArr.length === 0 ? 'No Comments' : 'View All Comments'}
          </p>
        </Link>
        <div className={Styles.commentContainer}>
          {commentArr.map((item) => {
            return <HomeCardCommentItem key={item.time} item={item} Styles={Styles} />;
          })}
        </div>
      </div>
      <div className={Styles.commentBox}>
        <form onSubmit={handleComment} className={Styles.commentForm}>
          <input
            className={Styles.inputBox}
            value={commentInput}
            onChange={handleChange}
            type="text"
            placeholder="Add a comment..."
            maxLength="99"
          />
        </form>
        <IoSendOutline onClick={handleComment} className={Styles.send} />
      </div>
    </>
  );
};

export default HomeCardComments;
