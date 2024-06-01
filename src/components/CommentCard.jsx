import React from 'react';

const CommentCard = ({ comment }) => {
  const styles = {
    container: {
      border: "1px solid #e1e8ed",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#f5f8fa",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Helvetica, Arial, sans-serif",
    },
    text: {
      fontSize: "1rem",
      color: "#555",
    },
    meta: {
      fontSize: "0.8rem",
      color: "#888",
      marginTop: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.text}>{comment.text}</div>
      <div style={styles.meta}>
        <span>By: {comment.username}</span>
        <span> | </span>
        <span>{new Date(comment.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CommentCard;
