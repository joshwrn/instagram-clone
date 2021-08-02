import React from 'react';
import { Link } from 'react-router-dom';
import ImageLoader from '../reusable/ImageLoader';

const HomeCardImage = ({ Styles, src, userID, postID }) => {
  return (
    <Link className={Styles.imageLink} to={`/post/${userID}/${postID}`}>
      <div className={Styles.imageContainer}>
        <ImageLoader src={src} cursor="pointer" />
      </div>
    </Link>
  );
};

export default HomeCardImage;
