import React, { useEffect, useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { useHistory } from 'react-router';
import Styles from '../../styles/home/home__card.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { firestore, firestoreFieldValue } from '../../services/firebase';

const HomeCardLike = ({ post, userID, setLikeState }) => {
  const [liked, setLiked] = useState(false);
  const { userProfile } = useAuth();
  let history = useHistory();

  const updateLikes = async () => {
    if (userProfile && userProfile.likedPosts) {
      if (userProfile.likedPosts.includes(post.id)) {
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
    if (userProfile && userID) {
      const thisPost = firestore.collection('users').doc(userID).collection('posts').doc(post.id);
      const thisUser = firestore.collection('users').doc(userProfile.userID);
      const postUser = firestore.collection('users').doc(userID);

      //@ add this post to likes
      if (!liked) {
        setLiked(true);
        setLikeState((prev) => prev + 1);
        const addPost = () => {
          thisPost.update({
            likes: firestoreFieldValue.arrayUnion(userProfile.userID),
          });
        };
        const addUser = () => {
          thisUser.update({
            likedPosts: firestoreFieldValue.arrayUnion(post.id),
          });
        };
        const notify = () => {
          postUser.update({
            notifications: firestoreFieldValue.arrayUnion({
              user: userProfile.userID,
              type: 'liked',
              post: post.id,
              time: Date.now(),
            }),
          });
        };
        await Promise.all([notify(), addPost(), addUser()]);
      } else {
        //@ remove post from likes
        const removePost = () => {
          setLiked(false);
          setLikeState((prev) => prev - 1);
          thisPost.update({
            likes: firestoreFieldValue.arrayRemove(userProfile.userID),
          });
        };
        const removeUser = () => {
          thisUser.update({
            likedPosts: firestoreFieldValue.arrayRemove(post.id),
          });
        };
        await Promise.all([removePost(), removeUser()]);
      }
    } else {
      history.push('/sign-up');
    }
  };
  return (
    <IoHeartOutline onClick={handleLike} className={liked ? Styles.likedIcon : Styles.likeIcon} />
  );
};

export default HomeCardLike;
