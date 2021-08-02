import React, { useState, useEffect, useRef } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IoShareSocialOutline, IoTrashOutline } from 'react-icons/io5';
import Styles from '../../styles/post/post__menu.module.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PostMenu = ({ ownPost, match, currentPost, firestore, storage }) => {
  const [menuStatus, setMenuStatus] = useState(false);
  const { getUserProfile } = useAuth();
  let history = useHistory();
  let menuRef = useRef();

  const handleMenu = (e) => {
    e.preventDefault();
    menuStatus ? setMenuStatus(false) : setMenuStatus(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await firestore
      .collection('users')
      .doc(match.params.uid)
      .collection('posts')
      .doc(match.params.postid)
      .delete();
    let pictureRef = storage.refFromURL(currentPost.src);
    await pictureRef.delete();
    const userDoc = await firestore.collection('users').doc(match.params.uid).get();
    const userData = userDoc.data();
    await firestore
      .collection('users')
      .doc(match.params.uid)
      .set(
        {
          postsCounter: userData.postsCounter - 1,
        },
        { merge: true }
      );
    await getUserProfile();
    history.push(`/profile/${match.params.uid}`);
  };

  const handleShare = () => {
    copyToClipboard(window.location.href);
    setMenuStatus(false);
  };

  const copyToClipboard = (content) => {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuStatus(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  let menu;

  menu = (
    <div ref={menuRef} className={ownPost ? Styles.containerOwn : Styles.container}>
      <div className={Styles.inner}>
        <div onClick={handleShare} className={Styles.option}>
          <IoShareSocialOutline className={Styles.icon} />
          <div>
            <p>Copy Link</p>
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
      <MoreHorizIcon onClick={handleMenu} className={Styles.postIcon} />
    </div>
  );
};

export default PostMenu;
