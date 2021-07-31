import { useState, useEffect } from 'react';

const useIntersect = (ref, end) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          if (!end) return setIsFetching(true);
          if (end.current === false) {
            setIsFetching(true);
          }
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
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return [isFetching, setIsFetching];
};

export default useIntersect;
