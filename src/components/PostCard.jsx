import React from 'react';

const PostCard = ({ post, currentUser }) => {
  const styles = {
    container: {
      border: "1px solid #e1e8ed",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#fff",
      maxWidth: "600px",
      margin: "0 auto",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    description: {
      fontSize: "1rem",
      color: "#555",
    },
    meta: {
      fontSize: "0.8rem",
      color: "#888",
      marginTop: "0.5rem",
    },
    actions: {
      marginTop: "1rem",
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>{post.title}</div>
      <div style={styles.description}>
        {post.description.length > 100 ? post.description.slice(0, 100) + '...' : post.description}
      </div>
      <div style={styles.meta}>
        <span>By: {post.username}</span>
        <span> | </span>
        <span>{new Date(post.date).toLocaleString()}</span>
        <span> | </span>
        <span>{post.comments.length} comments</span>
        <span> | </span>
        <span>{post.likes} likes</span>
        {currentUser.userId === post.userId && (
          <>
            <span> | </span>
            <span>{post.dislikes} dislikes</span>
          </>
        )}
      </div>
      <div style={styles.actions}>
        <button style={styles.button}>Comment</button>
        <button style={styles.button}>Like</button>
        <button style={styles.button}>Dislike</button>

        {currentUser.userId === post.userId && (
          <>
            <button style={styles.button}>Edit</button>
            <button style={styles.button}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;


