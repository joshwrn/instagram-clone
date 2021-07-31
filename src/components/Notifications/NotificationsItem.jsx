import React, { useEffect, useState } from 'react';
import { IoPersonAdd } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { firestore } from '../../services/firebase';
import convertTime from '../../functions/convertTime';
import Styles from '../../styles/notifications/notifications__item.module.css';

const NotificationsItem = ({ item, userProfile }) => {
  const [profile, setProfile] = useState();
  const [preview, setPreview] = useState();
  const [type, setType] = useState();
  const [addTime, setAddTime] = useState();

  const getProfile = async () => {
    const profileRef = await firestore.collection('users').doc(item.user).get();
    setProfile(profileRef.data());
  };

  const getPost = async () => {
    const postRef = await firestore
      .collection('users')
      .doc(userProfile.userID)
      .collection('posts')
      .doc(item.post)
      .get();
    const url = postRef.data()?.src;
    setPreview(url);
  };

  useEffect(() => {
    getProfile();
    if (item.type === 'liked' || item.type === 'comment') {
      getPost();
    }
  }, []);

  useEffect(() => {
    const currentTime = Date.now();
    const converted = convertTime(item.time, currentTime);
    setAddTime(converted);
  }, []);

  useEffect(() => {
    if (profile && preview) {
      if (item.type === 'liked') {
        setType(
          <Link className={Styles.link} to={`/post/${userProfile.userID}/${item.post}`}>
            <div className={Styles.container}>
              <div className={Styles.start}>
                <Link className={Styles.inlineLink} to={`/profile/${item.user}`}>
                  <div className={Styles.avatarContainer}>
                    <img className={Styles.avatar} src={profile.profilePhoto} alt="" />
                  </div>
                  <div className={Styles.displayName}>{profile.displayName}</div>
                </Link>
                <div className={Styles.type}>liked your post.</div>
              </div>
              <div className={Styles.end}>
                <span className={Styles.time}>{`${addTime}`}</span>
                <img className={Styles.preview} src={preview} alt="" />
              </div>
            </div>
          </Link>
        );
      }
      if (item.type === 'comment') {
        setType(
          <Link className={Styles.link} to={`/post/${userProfile.userID}/${item.post}`}>
            <div className={Styles.container}>
              <div className={Styles.start}>
                <Link className={Styles.inlineLink} to={`/profile/${item.user}`}>
                  <div className={Styles.avatarContainer}>
                    <img className={Styles.avatar} src={profile.profilePhoto} alt="" />
                  </div>
                  <div className={Styles.displayName}>{profile.displayName}</div>
                </Link>
                <div className={Styles.type}>left a comment:</div>
                <div className={Styles.comment}>
                  {item.comment.length >= 15 ? item.comment.substring(0, 15) + '...' : item.comment}
                </div>
              </div>
              <div className={Styles.end}>
                <span className={Styles.time}>{`${addTime}`}</span>
                <img className={Styles.preview} src={preview} alt="" />
              </div>
            </div>
          </Link>
        );
      }
    } else if (profile && item.type === 'followed') {
      setType(
        <Link className={Styles.link} to={`/profile/${item.user}`}>
          <div className={Styles.container}>
            <div className={Styles.start}>
              <div className={Styles.avatarContainer}>
                <img className={Styles.avatar} src={profile.profilePhoto} alt="" />
              </div>
              <div className={Styles.displayName}>{profile.displayName}</div>
              <div className={Styles.type}>followed you.</div>
            </div>
            <div className={Styles.end}>
              <span className={Styles.time}>{`${addTime}`}</span>
              <IoPersonAdd className={Styles.followed} />
            </div>
          </div>
        </Link>
      );
    }
  }, [preview, profile]);

  return <>{profile && type}</>;
};

export default NotificationsItem;
