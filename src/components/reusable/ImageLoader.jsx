import React, { useState } from 'react';

const ImageLoader = ({
  src,
  position = 'relative',
  width = '100%',
  height = '100%',
  transition = 1,
  cursor = 'pointer',
  borderRadius = '0',
  shadow = 'none',
}) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const loadingDiv = {
    width: width,
    height: height,
    position: position,
    zIndex: '1',
    background: 'var(--loading-gradient)',
    backgroundSize: '200%',
    animation: '2s linear infinite gradientMove',
    display: 'block',
    borderRadius: borderRadius,
    boxShadow: shadow,
  };

  const hideDiv = {
    width: width,
    height: height,
    position: position,
    zIndex: '1',
    background: 'var(--loading-gradient)',
    backgroundSize: '200%',
    animation: 'none',
    display: 'block',
    borderRadius: borderRadius,
    boxShadow: shadow,
  };

  const image = {
    position: position,
    width: width,
    height: height,
    objectFit: 'cover',
    objectPosition: 'center',
    cursor: cursor,
    opacity: '1',
    transition: `opacity ${transition}s`,
    borderRadius: borderRadius,
    boxShadow: shadow,
  };

  const hideImg = {
    position: position,
    width: width,
    height: height,
    opacity: '0',
    borderRadius: borderRadius,
  };

  return (
    <>
      <div style={!loading ? hideDiv : loadingDiv}>
        <img style={!loading ? image : hideImg} onLoad={handleLoad} src={src} alt="" />
      </div>
    </>
  );
};

export default ImageLoader;
