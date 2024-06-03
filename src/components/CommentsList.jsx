import React from 'react';
import CommentCard from './CommentCard';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
};

const CommentsList = ({ comments }) => {
  return (
    <div style={styles.container}>
      {comments.map((comment, index) => (
        <CommentCard key={index} post={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
