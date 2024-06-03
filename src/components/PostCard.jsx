import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, deletePost, addPost } from "../store/reducers/postsSlice";
import { faker } from "@faker-js/faker";

const PostCard = ({ post, refreshPosts }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const currentUser = useSelector((state) => state.auth.user) || {};
  const { posts, status, error } = useSelector((state) => state.posts);
  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

  let postComments = posts.filter(
    (p) => p.postType === "comment" && p.parentPostId === post.postId,
  );

  const updateUserPoints = async (userKey, points) => {
    const userResp = await fetch(`${baseUrl}/users/${userKey}.json`);
    const user = await userResp.json();
    const updatedPoints = user.points + points;
    await fetch(`${baseUrl}/users/${userKey}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points: updatedPoints }),
    });
  };

  const handleComment = async (e) => {
    e.stopPropagation();
    if (!comment) return;
    const newComment = {
      postType: "comment",
      postId: faker.string.uuid(),
      parentPostId: post.postId,
      title: "",
      description: comment,
      date: new Date().toISOString(),
      userKey: currentUser.key,
      userId: currentUser.userId,
      username: currentUser.username,
      keywords: [""],
      likes: 0,
      dislikes: 0,
    };
    const response = await fetch(`${baseUrl}/posts.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });
    const data = await response.json();
    dispatch(addPost({ ...newComment, id: data.name }));
    setComment("");
    await updateUserPoints(currentUser.key, 2);
    if (currentUser.key !== post.userKey) {
      await updateUserPoints(post.userKey, 2);
    }
    refreshPosts();
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    const updatedLikes = post.likes + 1;
    await fetch(`${baseUrl}/posts/${post.id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    });
    dispatch(updatePost({ ...post, likes: updatedLikes }));
    await updateUserPoints(currentUser.key, 1);
    if (currentUser.key !== post.userKey) {
      await updateUserPoints(post.userKey, 1);
    }
    refreshPosts();
  };

  const handleDislike = async (e) => {
    e.stopPropagation();
    const updatedDislikes = post.dislikes + 1;
    await fetch(`${baseUrl}/posts/${post.id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dislikes: updatedDislikes }),
    });
    dispatch(updatePost({ ...post, dislikes: updatedDislikes }));
    refreshPosts();
  };

  const handleEdit = async (e) => {
    e.stopPropagation();
    let updatedTitle = prompt("Insira novo título:", post.title);
    if (updatedTitle === null || updatedTitle.trim() === "") {
      updatedTitle = post.title;
    }

    let updatedDescription = prompt("Insira nova descrição:", post.description);
    if (updatedDescription === null || updatedDescription.trim() === "") {
      updatedDescription = post.description;
    }

    await fetch(`${baseUrl}/posts/${post.id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedTitle,
        description: updatedDescription,
      }),
    });
    dispatch(
      updatePost({
        ...post,
        title: updatedTitle,
        description: updatedDescription,
      }),
    );
    refreshPosts();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await fetch(`${baseUrl}/posts/${post.id}.json`, {
      method: "DELETE",
    });
    dispatch(deletePost(post.id));
    refreshPosts();
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
      fontFamily: "Helvetica, Arial, sans-serif",
      cursor: "pointer",
    },
    containerHover: {
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
      backgroundColor: "rgba(211,211,211,0.3)",
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
    actions: {
      marginTop: "1rem",
      display: "flex",
      justifyContent: "space-between",
    },
    button: {
      backgroundColor: "#1da1f2",
      color: "#fff",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "16px",
      cursor: "pointer",
      fontSize: "0.9rem",
    },
    commentInput: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "16px",
      border: "1px solid #e1e8ed",
      marginBottom: "0.5rem",
    },
  };

  return (
    <div
      style={{ ...styles.container, ...(isHovered && styles.containerHover) }}
      onClick={() => navigate(`/posts/${post.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>Current User: {currentUser.key}</div>
      <div>Post User: {post.userKey}</div>
      <div>Post: {post.id}</div>
      <div>PostId: {post.postId}</div>
      <div>PostType: {post.postType}</div>

      <div style={styles.title}>{post.title}</div>
      <div style={styles.description}>
        {post.description.length > 100
          ? post.description.slice(0, 100) + "..."
          : post.description}
      </div>
      <div style={styles.meta}>
        <span>By: {post.username}</span>
        <span> | </span>
        <span>{new Date(post.date).toLocaleString()}</span>
        <span> | </span>
        <span>{postComments.length} comments</span>
        <span> | </span>
        <span>{post.likes} likes</span>
        {currentUser.userId === post.userId && (
          <>
            <span> | </span>
            <span>{post.dislikes} dislikes</span>
          </>
        )}
      </div>
      {currentUser.userId && (
        <div style={styles.actions} onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            style={styles.commentInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Insira um comentário..."
          />
          <button style={styles.button} onClick={handleComment}>
            Comment
          </button>
          <button style={styles.button} onClick={handleLike}>
            Like
          </button>
          <button style={styles.button} onClick={handleDislike}>
            Dislike
          </button>
          {currentUser.userId === post.userId && (
            <>
              <button style={styles.button} onClick={handleEdit}>
                Edit
              </button>
              <button style={styles.button} onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
