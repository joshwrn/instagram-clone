import React, { useState } from 'react';
import '../../styles/profile/profile__modal.css';
import { IoCloseOutline, IoCloudUploadOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { firestore, initFire, timestamp } from '../../services/firebase';

const ProfileUpload = ({ getModal, currentUser, currentProfile, setNewPost }) => {
  const [postFile, setPostFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 1000000) {
      setPostFile(file);
    } else {
      setPostFile(null);
    }
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createPost = await firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('posts')
      .add({
        date: timestamp,
        likesCounter: 0,
        commentsCounter: 0,
        caption: caption,
      });
    const storageRef = initFire.storage().ref();
    const fileRef = storageRef.child(`${currentUser.uid}/${createPost.id}`);
    await fileRef.put(postFile);
    const fileUrl = await fileRef.getDownloadURL();
    console.log(fileUrl);
    await createPost.set(
      {
        src: fileUrl,
      },
      { merge: true }
    );
    await firestore
      .collection('users')
      .doc(currentUser.uid)
      .set(
        {
          postsCounter: currentProfile.postsCounter + 1,
          lastPostDate: timestamp,
        },
        { merge: true }
      );
    getModal(e);
    setNewPost((prev) => prev + 1);
  };

  const doNothing = (e) => {
    e.preventDefault();
  };

  return (
    <div id="profile__upload-modal">
      <div id="profile__upload-modal__container">
        <div id="profile__upload-modal__header">
          <h3>Create New Post</h3>
          <IoCloseOutline onClick={getModal} className="close" />
        </div>
        <div id="profile__upload-modal__top-container">
          <form>
            <div id="profile__upload-modal__upload-container">
              <label className="profile__upload-modal__button-container">
                <input
                  onChange={handleFileChange}
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  className="file-input"
                />
                {postFile === null ? (
                  <IoCloudUploadOutline className="upload" />
                ) : (
                  <IoCheckmarkCircleOutline
                    className="upload"
                    style={{ color: '#00C138', border: '2px solid #00C138' }}
                  />
                )}
              </label>
            </div>
            <p>{postFile === null ? 'File size limit 1 mb.' : 'ready to post'}</p>
            <div id="profile__upload-modal__caption-container">
              <textarea
                className="caption-input"
                name="caption"
                maxLength="150"
                placeholder="Enter Caption..."
                onChange={handleTextChange}
              />
              <button
                onClick={postFile !== null ? handleSubmit : doNothing}
                type="submit"
                className="post-btn"
                style={
                  postFile === null
                    ? { backgroundColor: 'var(--primary-background-color)' }
                    : {
                        backgroundColor: 'var(--save-color)',
                        color: 'white',
                        boxShadow: '0px 0.25em 0.5em 1px var(--save-shadow-color)',
                      }
                }
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpload;
