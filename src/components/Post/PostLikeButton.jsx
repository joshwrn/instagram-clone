import React, { useEffect, useState } from 'react';

const PostLikeButton = ({
  match,
  currentUser,
  history,
  firestore,
  firestoreFieldValue,
  Styles,
  IoHeartOutline,
  userProfile,
}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    userProfile?.likedPosts.includes(match.params.postid) && setLiked(true);
  }, [userProfile]);

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
