import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentCard from "../components/CommentCard";
import CommentsList from "../components/CommentsList";

const PostDetailsScreen = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.auth.user) || {};
  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

  useEffect(() => {
    fetch(`${baseUrl}/posts/${postId}.json`)
      .then(async (resp) => {
        const data = await resp.json();
        setPost(data);
      })
      .catch((err) => setMessage(err.message))
      .finally(() => setLoading(false));
  }, [postId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  if (!post) {
    return <p>No post found</p>;
  }

  const styles = {
    container: {
      border: "1px solid #e1e8ed",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#fff",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Helvetica, Arial, sans-serif",
    },

    title: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#1da1f2",
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
    comments: {
      marginTop: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    commentTitle: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div style={styles.container}>
        <div style={styles.title}>{post.title}</div>
        <div style={styles.description}>{post.description}</div>
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
        <div style={styles.comments}>
          <div style={styles.commentTitle}>Comments:</div>
          {/* {post.comments.map((comment, index) => (
            <CommentCard key={index} comment={comment} />
          ))} */}
          <CommentsList comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailsScreen;
