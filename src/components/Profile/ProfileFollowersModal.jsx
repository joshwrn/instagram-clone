import React from 'react';
import Styles from '../../styles/profile/profile__followers-modal.module.css';
import { IoCloseOutline } from 'react-icons/io5';
import ProfileFollowerListItem from './ProfileFollowerListItem';
const ProfileFollowers = ({
  openFollowers,
  handleFollowers,
  currentProfile,
  currentTab,
  setCurrentTab,
  currentUser,
  getUserObject,
}) => {
  // const [followers, setFollowers] = useState([]);
  // const [following, setFollowing] = useState([]);

  //   useEffect(() => {
  //     setFollowing(currentProfile?.following);
  //     setFollowers(currentProfile?.followers);
  //   }, [currentProfile]);

  const handleSwitch = (e) => {
    e.preventDefault();
    const choice = e.target.getAttribute('data-type');
    setCurrentTab(choice);
  };

  let map;

  if (currentTab === 'following') {
    map = currentProfile?.following.map((item) => {
      return (
        <ProfileFollowerListItem
          currentTab={currentTab}
          handleFollowers={handleFollowers}
          item={item}
          Styles={Styles}
          currentUser={currentUser}
          getUserObject={getUserObject}
        />
      );
    });
  }

  if (currentTab === 'followers') {
    map = currentProfile?.followers.map((item) => {
      return (
        <ProfileFollowerListItem
          currentTab={currentTab}
          handleFollowers={handleFollowers}
          item={item}
          Styles={Styles}
          currentUser={currentUser}
          getUserObject={getUserObject}
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
            <div className={Styles.listContainer}>{map}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileFollowers;
