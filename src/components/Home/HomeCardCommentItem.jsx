import React, { useEffect, useState } from 'react';
import { firestore } from '../../services/firebase';
import { Link } from 'react-router-dom';

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
          </Link>{' '}
          {item.comment}
        </p>
      )}
    </>
  );
};

export default HomeCardCommentItem;
