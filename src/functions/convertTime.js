const convertTime = (start, end) => {
  const total = (end - start) / 1000;
  if (total < 30) {
    return 'now';
  }
  if (total < 60) {
    const converted = Math.floor(total);
    return `${converted}s`;
  }
  if (total >= 60 && total < 3600) {
    const converted = Math.floor(total / 60);
    return `${converted}m`;
  }
  if (total >= 3600 && total < 86400) {
    const converted = Math.floor(total / 3600);
    return `${converted}h`;
  }
  if (total >= 86400 && total < 604800) {
    const converted = Math.floor(total / 86400);
    return `${converted}d`;
  }
  if (total >= 604800 && total < 2592000) {
    const converted = Math.floor(total / 604800);
    return `${converted}w`;
  }
  if (total >= 2592000 && total < 31536000) {
    const converted = Math.floor(total / 2592000);
    return `${converted}${converted === 1 ? 'mth' : 'mths'}`;
  }
  if (total >= 31536000) {
    const converted = Math.floor(total / 31536000);
    return `${converted}${converted === 1 ? 'yr' : 'yrs'}`;
  }
};

export default convertTime;
