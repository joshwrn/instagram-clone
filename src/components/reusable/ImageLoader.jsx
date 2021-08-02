import React, { useState } from 'react';

const ImageLoader = ({
  src,
  position = 'relative',
  width = '100%',
  height = '100%',
  transition = 0.7,
  cursor = 'pointer',
  borderRadius = '0',
  shadow = 'none',
  zIndex = '1',
  transform = 'initial',
}) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const loadingDiv = {
    width,
    height,
    position,
    zIndex,
    background: 'var(--loading-gradient)',
    backgroundSize: '200%',
    animation: '2s linear infinite gradientMove',
    borderRadius,
    boxShadow: shadow,
    transform,
  };

  const hideDiv = {
    width,
    height,
    position,
    zIndex,
    background: 'var(--loading-gradient)',
    backgroundSize: '200%',
    animation: 'none',
    display: 'block',
    borderRadius,
    boxShadow: shadow,
    transform,
  };

  const image = {
    position,
    width,
    height,
    objectFit: 'cover',
    objectPosition: 'center',
    cursor,
    opacity: '1',
    transition: `opacity ${transition}s`,
    borderRadius,
    boxShadow: shadow,
    transform,
  };

  const hideImg = {
    position,
    width,
    height,
    opacity: '0',
    borderRadius,
    transform,
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
