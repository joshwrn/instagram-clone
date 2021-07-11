import React from 'react';

const PostCommentBox = ({ Styles, IoSendOutline }) => {
  return (
    <div className={Styles.commentBox}>
      <form className={Styles.commentForm}>
        <input className={Styles.input} type="text" placeholder="Add a comment..." />
      </form>
      <IoSendOutline className={Styles.send} />
    </div>
  );
};

export default PostCommentBox;
