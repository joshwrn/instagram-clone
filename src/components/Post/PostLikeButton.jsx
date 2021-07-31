import React, { useEffect, useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import Styles from '../../styles/post/post__sidebar.module.css';
import { useAuth } from '../../contexts/AuthContext';

const PostLikeButton = ({ match, history, firestore, firestoreFieldValue, getCurrentPost }) => {
  const [liked, setLiked] = useState(false);
  const { userProfile, getUserProfile } = useAuth();

  const updateLikes = async () => {
    if (userProfile && userProfile.likedPosts) {
      if (userProfile.likedPosts.includes(match.params.postid)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  };

  useEffect(() => {
    updateLikes();
  }, [userProfile]);

  //! handle like
  const handleLike = async (e) => {
    e.preventDefault();
    if (userProfile) {
      const thisPost = firestore
        .collection('users')
        .doc(match.params.uid)
        .collection('posts')
        .doc(match.params.postid);
      const thisUser = firestore.collection('users').doc(userProfile.userID);
      const postUser = firestore.collection('users').doc(match.params.uid);

      //@ add this post to likes
      if (!liked) {
        setLiked(true);
        const addPost = () => {
          thisPost.update({
            likes: firestoreFieldValue.arrayUnion(userProfile.userID),
          });
        };
        const addUser = () => {
          thisUser.update({
            likedPosts: firestoreFieldValue.arrayUnion(match.params.postid),
          });
        };
        const notify = () => {
          postUser.update({
            notifications: firestoreFieldValue.arrayUnion({
              user: userProfile.userID,
              type: 'liked',
              post: match.params.postid,
              time: Date.now(),
            }),
          });
        };
        await Promise.all([notify(), addPost(), addUser()]);
        getUserProfile();
        getCurrentPost();
      } else {
        //@ remove post from likes
        const removePost = () => {
          setLiked(false);
          thisPost.update({
            likes: firestoreFieldValue.arrayRemove(userProfile.userID),
          });
        };
        const removeUser = () => {
          thisUser.update({
            likedPosts: firestoreFieldValue.arrayRemove(match.params.postid),
          });
        };
        await Promise.all([removePost(), removeUser()]);
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
