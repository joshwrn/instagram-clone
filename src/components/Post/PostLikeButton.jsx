import React, { useEffect, useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import Styles from '../../styles/post/post__sidebar.module.css';
import { useAuth } from '../../contexts/AuthContext';

const PostLikeButton = ({
  match,
  currentUser,
  history,
  firestore,
  firestoreFieldValue,
  getCurrentPost,
}) => {
  const [liked, setLiked] = useState(false);
  const { userProfile, getUserProfile } = useAuth();

  useEffect(() => {
    updateLikes();
  }, [userProfile]);

  const updateLikes = async () => {
    if (userProfile) {
      if (userProfile.likedPosts.includes(match.params.postid)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  };

  //! handle like
  const handleLike = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const thisPost = firestore
        .collection('users')
        .doc(match.params.uid)
        .collection('posts')
        .doc(match.params.postid);

      const thisUser = firestore.collection('users').doc(currentUser.uid);

      //@ add this post to likes
      if (!liked) {
        const addPost = () => {
          thisPost.update({
            likes: firestoreFieldValue.arrayUnion(match.params.uid),
          });
        };
        const addUser = () => {
          thisUser.update({
            likedPosts: firestoreFieldValue.arrayUnion(match.params.postid),
          });
        };
        await Promise.all([addPost(), addUser()]);
        setLiked(true);
        getUserProfile();
        getCurrentPost();
      } else {
        //@ remove post from likes
        const removePost = () => {
          thisPost.update({
            likes: firestoreFieldValue.arrayRemove(match.params.uid),
          });
        };
        const removeUser = () => {
          thisUser.update({
            likedPosts: firestoreFieldValue.arrayRemove(match.params.postid),
          });
        };
        await Promise.all([removePost(), removeUser()]);
        setLiked(false);
        getUserProfile();
        getCurrentPost();
      }
    } else {
      history.push('/sign-up');
    }
  };
  return (
    <IoHeartOutline onClick={handleLike} className={liked ? Styles.likedIcon : Styles.likeIcon} />
  );
};

export default PostLikeButton;
