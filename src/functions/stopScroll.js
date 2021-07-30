//+ new post modal
const stopScroll = (state) => {
  if (state === false) {
    document.body.classList.add('stop-scrolling');
  } else {
    document.body.classList.remove('stop-scrolling');
  }
};

export default stopScroll;
