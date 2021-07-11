import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PostCommentBox = ({
  Styles,
  IoSendOutline,
  currentUser,
  firestore,
  match,
  firestoreFieldValue,
  getCurrentPost,
}) => {
  const [input, setInput] = useState('');
  let history = useHistory();

  const { userProfile, getUserProfile } = useAuth();

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = Date();
    if (currentUser) {
      if (input.length > 0 && input.length < 100) {
        const thisPost = firestore
          .collection('users')
          .doc(match.params.uid)
          .collection('posts')
          .doc(match.params.postid);
        //@ add comment to post
        const addPost = () => {
          thisPost.update({
            comments: firestoreFieldValue.arrayUnion({
              user: currentUser.uid,
              comment: input,
              time: time,
            }),
          });
        };

        await Promise.all([addPost()]);
        getUserProfile();
        getCurrentPost();
        setInput('');
      }
    } else {
      history.push('/sign-up');
    }
  };

  return (
    <div className={Styles.commentBox}>
      <form className={Styles.commentForm} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className={Styles.input}
          type="text"
          value={input}
          maxLength="99"
          minLength="1"
          placeholder="Add a comment..."
        />
      </form>
      <IoSendOutline type="submit" onClick={handleSubmit} className={Styles.send} />
    </div>
  );
};

export default PostCommentBox;
