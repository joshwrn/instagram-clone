import React, { useState, useEffect, useRef } from 'react';
import Styles from '../../styles/profile/profile__followers-modal.module.css';
import { IoCloseOutline } from 'react-icons/io5';
import ProfileFollowerListItem from './ProfileFollowerListItem';
import stopScroll from '../../functions/stopScroll';

const ProfileFollowers = ({
  openFollowers,
  handleFollowers,
  currentProfile,
  currentTab,
  setCurrentTab,
  currentUser,
}) => {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const ref = useRef();

  const handleSwitch = (e) => {
    e.preventDefault();
    const choice = e.target.getAttribute('data-type');
    setCurrentTab(choice);
  };

  useEffect(() => {
    if (!currentProfile) return;
    const { followers, following } = currentProfile;
    let current;
    currentTab === 'following' ? (current = following) : (current = followers);

    const reverse = current.slice(0).reverse();
    const slice = reverse.slice(0, 20);
    setList(slice);
  }, [currentTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          setIsFetching(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  //+ GET more from storage
  const createMore = () => {
    if (!currentProfile) return;
    const { followers, following } = currentProfile;
    let current;
    currentTab === 'following' ? (current = following) : (current = followers);

    const reverse = current.slice(0).reverse();
    const sliced = reverse.slice(list.length, list.length + 20);

    const combine = [...list, ...sliced];
    setList(combine);
  };

  useEffect(() => {
    if (!isFetching) return;
    console.log('yay');
    createMore();
  }, [isFetching]);

  useEffect(() => {
    setIsFetching(false);
  }, [list]);

  let map;

  if (currentTab === 'following') {
    map = list.map((item) => {
      return (
        <ProfileFollowerListItem
          currentTab={currentTab}
          handleFollowers={handleFollowers}
          item={item}
          Styles={Styles}
          currentUser={currentUser}
        />
      );
    });
  }

  if (currentTab === 'followers') {
    map = list.map((item) => {
      return (
        <ProfileFollowerListItem
          currentTab={currentTab}
          handleFollowers={handleFollowers}
          item={item}
          Styles={Styles}
          currentUser={currentUser}
        />
      );
    });
  }

  return (
    <>
      {openFollowers && (
        <div className={Styles.modal}>
          <div className={Styles.container}>
            <div className={Styles.header}>
              <div className={Styles.tabs}>
                <div
                  onClick={handleSwitch}
                  data-type="following"
                  className={
                    currentTab === 'following' ? Styles.activeHeader : Styles.inactiveHeader
                  }
                >
                  <h3 data-type="following">Following</h3>
                </div>
                <div
                  onClick={handleSwitch}
                  data-type="followers"
                  className={
                    currentTab === 'followers' ? Styles.activeHeader : Styles.inactiveHeader
                  }
                >
                  <h3 data-type="followers">Followers</h3>
                </div>
              </div>
              <IoCloseOutline onClick={handleFollowers} className={Styles.close} />
            </div>
            {/*//+ list of followers is here */}
            <div className={Styles.listContainer}>
              {map}
              <div className={Styles.dummy} ref={ref}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileFollowers;
