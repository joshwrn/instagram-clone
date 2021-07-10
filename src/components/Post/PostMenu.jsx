import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IoShareSocialOutline, IoTrashOutline } from 'react-icons/io5';
import Styles from '../../styles/post/post__menu.module.css';
import { firestore, storage } from '../../services/firebase';
import { useHistory } from 'react-router-dom';

const PostMenu = ({ ownPost, match, currentPost }) => {
  const [menuStatus, setMenuStatus] = useState(false);
  let history = useHistory();
  const handleMenu = (e) => {
    e.preventDefault();
    console.log(menuStatus);
    menuStatus ? setMenuStatus(false) : setMenuStatus(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const img = await firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .doc(match.params.postid)
      .delete();
    let pictureRef = storage.refFromURL(currentPost.src);
    await pictureRef.delete();
    firestore
      .collection('users')
      .doc(match.params.uid)
      .get()
      .then((userData) => {
        if (userData.exists) {
          firestore
            .collection('users')
            .doc(match.params.uid)
            .set(
              {
                postsCounter: userData.data().postsCounter - 1,
              },
              { merge: true }
            );
          history.push(`/profile/${match.params.uid}`);
        }
      });
  };

  let menu;

  menu = (
    <div className={Styles.container}>
      <div className={Styles.inner}>
        <div className={Styles.option}>
          <IoShareSocialOutline className={Styles.icon} />
          <div>
            <p>Share</p>
          </div>
        </div>
        {ownPost ? (
          <div className={Styles.option} onClick={handleDelete}>
            <IoTrashOutline className={Styles.icon} />
            <p>Delete</p>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <div>
      {menuStatus ? menu : null}
      <MoreHorizIcon onClick={handleMenu} className="post__icon" />
    </div>
  );
};

export default PostMenu;
