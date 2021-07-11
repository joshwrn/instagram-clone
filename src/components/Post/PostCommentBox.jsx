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
    if (currentUser) {
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
            avatar: userProfile.profilePhoto,
            name: userProfile.displayName,
          }),
        });
      };

      await Promise.all([addPost()]);
      getUserProfile();
      getCurrentPost();
      setInput('');
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
          placeholder="Add a comment..."
        />
      </form>
      <IoSendOutline type="submit" onClick={handleSubmit} className={Styles.send} />
    </div>
  );
};

export default PostCommentBox;
