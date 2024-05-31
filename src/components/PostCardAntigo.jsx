import React, { useState } from "react";

const PostCardAntigo = ({ post, currentUser }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.description);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      userId: currentUser.userId,
      username: currentUser.username,
      text: commentText,
      createdAt: new Date(),
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  const handleDeleteClick = () => {};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={currentUser.avatar} alt="Avatar" style={styles.avatar} />
        <div>
          <div style={styles.userInfo}>
            <span style={styles.name}>{currentUser.name}</span>
            <span style={styles.username}>@{currentUser.username}</span>
          </div>
          <div>
            {isEditing ? (
              <textarea
                style={styles.textarea}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              <p style={styles.text}>{post.description}</p>
            )}
          </div>
        </div>
      </div>
      <div style={styles.actions}>
        <button style={styles.actionButton} onClick={handleLikeClick}>
          {isLiked ? (
            <i className="fas fa-heart" style={styles.iconLiked}></i>
          ) : (
            <i className="far fa-heart" style={styles.icon}></i>
          )}
          {likes}
        </button>
        <button
          style={styles.actionButton}
          onClick={() => console.log("Comment")}
        >
          <i className="far fa-comment" style={styles.icon}></i>
        </button>
        <button
          style={styles.actionButton}
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? (
            <i className="far fa-save" style={styles.icon}></i>
          ) : (
            <i className="far fa-edit" style={styles.icon}></i>
          )}
        </button>
        <button style={styles.actionButton} onClick={handleDeleteClick}>
          <i className="far fa-trash-alt" style={styles.icon}></i>
        </button>
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            style={styles.commentInput}
          />
          <button type="submit" style={styles.commentButton}>
            Add
          </button>
        </form>
        <ul style={styles.commentList}>
          {post.comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

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
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  avatar: {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    marginRight: "0.5rem",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  username: {
    fontSize: "0.875rem",
    color: "#657786",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  textarea: {
    width: "100%",
    minHeight: "50px",
    fontSize: "1rem",
    marginBottom: "0.5rem",
    padding: "0.5rem",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "250px",
    marginTop: "0.5rem",
  },
  actionButton: {
    cursor: "pointer",
    color: "#1DA1F2",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "0.25rem",
  },
  iconLiked: {
    color: "red",
    marginRight: "0.25rem",
  },
  commentInput: {
    width: "calc(100% - 70px)",
    padding: "0.5rem",
    borderRadius: "4px 0 0 4px",
    border: "1px solid #ccc",
    borderTop: "none",
    borderRight: "none",
    borderBottom: "none",
  },
  commentButton: {
    width: "70px",
    padding: "0.5rem",
    backgroundColor: "#1DA1F2",
    color: "#fff",
    border: "none",
    borderRadius: "0 4px 4px 0",
    cursor: "pointer",
  },
  commentList: {
    listStyleType: "none",
    padding: 0,
  },
};

export default PostCardAntigo;
