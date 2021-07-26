import React, { useState } from 'react';
import Styles from '../../styles/profile/profile__upload.module.css';
import { IoCloseOutline, IoCloudUploadOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { firestore, storageRef } from '../../services/firebase';
import resizeImage from '../../functions/resizeImage.js';

const ProfileUpload = ({ getModal, currentUser, currentProfile, setNewPost }) => {
  const [postFile, setPostFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState();

  //+ after choosing a file store it in state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5000000) {
      resizeImage(e, setImageFile, setPostFile, 1000);
    } else {
      setPostFile(null);
    }
  };

  //+ set the caption
  const handleTextChange = (e) => {
    e.preventDefault();
    setCaption(e.target.value);
  };

  //+ submit the post
  const handleSubmit = async (e) => {
    const timestamp = Date.now();
    e.preventDefault();
    setUploading(true);
    //+ create post info
    const createPost = await firestore
      .collection('users')
      .doc(currentUser.uid)
      .collection('posts')
      .add({
        date: timestamp,
        likes: [],
        comments: [],
        caption: caption,
        userID: currentUser.uid,
      });
    //+ upload image to storage
    const fileRef = storageRef.child(`${currentUser.uid}/${createPost.id}`);
    await fileRef.put(postFile);
    const fileUrl = await fileRef.getDownloadURL();
    //+ set src to image url
    await createPost.set(
      {
        src: fileUrl,
      },
      { merge: true }
    );
    //+ update post count
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
    //+ close modal and update state with new post
    getModal(e);
    setUploading(false);
    setNewPost((prev) => prev + 1);
  };

  const doNothing = (e) => {
    e.preventDefault();
  };

  return (
    <div className={Styles.modal}>
      <div className={Styles.container}>
        <div className={Styles.header}>
          <h3>Create New Post</h3>
          <IoCloseOutline onClick={getModal} className={Styles.close} />
        </div>
        <div className={Styles.topContainer}>
          <img
            style={!imageFile ? { display: 'none' } : null}
            className={Styles.preview}
            src={imageFile}
            alt=""
          />

          <div style={imageFile && { display: 'none' }} className={Styles.uploadContainer}>
            <label className={Styles.buttonContainer}>
              <input
                onChange={handleFileChange}
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className={Styles.fileInput}
              />
              <IoCloudUploadOutline className={Styles.upload} />
              <p>{postFile === null ? 'File size limit 5 mb.' : 'ready to post'}</p>
            </label>
          </div>
          <div>
            <div className={Styles.captionContainer}>
              <textarea
                className={Styles.captionInput}
                name="caption"
                maxLength="150"
                placeholder="Enter Caption..."
                onChange={handleTextChange}
              />
            </div>
          </div>
        </div>
        {uploading ? (
          <div className={`${Styles.loader} loader`}></div>
        ) : (
          <button
            onClick={postFile !== null ? handleSubmit : doNothing}
            type="submit"
            className={Styles.postButton}
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
        )}
      </div>
    </div>
  );
};

export default ProfileUpload;
