import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../services/firebase';

const HomeCardCommentItem = ({ Styles, item }) => {
  const [current, setCurrent] = useState();

  useEffect(() => {
    const getUser = async () => {
      const userRef = firestore.collection('users').doc(item.user);
      const thisUser = await userRef.get();
      setCurrent(thisUser.data());
    };
    getUser();
  }, [item]);
  return (
    <>
      {current && (
        <p className={Styles.comment}>
          <Link to={`/profile/${current.userID}`}>
            <span className={Styles.commentUser}>{current.displayName}</span>
          </Link>
          {item.comment.length >= 15 ? item.comment.substring(0, 50) + '...' : item.comment}
        </p>
      )}
    </>
  );
};

export default HomeCardCommentItem;
