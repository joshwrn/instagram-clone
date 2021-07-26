import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeCardImage = ({ Styles, src, userID, postID }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <Link className={Styles.imageLink} to={`/Post/${userID}/${postID}`}>
      <div
        style={!loading ? { display: 'none' } : { display: 'block' }}
        className={Styles.loading}
      ></div>
      <img
        style={!loading ? { opacity: '1' } : { opacity: '0' }}
        onLoad={handleLoad}
        className={Styles.image}
        src={src}
        alt=""
      />
    </Link>
  );
};

export default HomeCardImage;
