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
  const [comment, setComment] = useState("");

  const currentUser = useSelector((state) => state.auth.user) || {};
  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

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

  useEffect(() => {
    fetch(`${baseUrl}/posts/${postId}.json`)
      .then(async (resp) => {
        const data = await resp.json();
        setPost(data);
      })
      .catch((err) => setMessage(err.message))
      .finally(() => setLoading(false));
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      const response = await fetch(`${baseUrl}/posts/${postId}.json`);
      if (!response.ok) {
        throw new Error("Falha ao carregar detalhes do post.");
      }
      const postData = await response.json();
      setPost(postData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleComment = async () => {
    if (!comment) return;
    const newComment = {
      text: comment,
      userId: currentUser.userId,
      username: currentUser.username,
      date: new Date().toISOString(),
    };
    const updatedComments = [...post.comments, newComment];
    await fetch(`${baseUrl}/posts/${postId}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comments: updatedComments }),
    });
    setComment("");
    await updateUserPoints(currentUser.key, 2);
    if (currentUser.key !== post.userKey) {
      await updateUserPoints(post.userKey, 2);
    }
    fetchPostDetails();
  };

  const handleLike = async () => {
    const updatedLikes = post.likes + 1;
    await fetch(`${baseUrl}/posts/${postId}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    });
    await updateUserPoints(currentUser.key, 1);
    if (currentUser.key !== post.userKey) {
      await updateUserPoints(post.userKey, 1);
    }
    fetchPostDetails();
  };

  const handleDislike = async () => {
    const updatedDislikes = post.dislikes + 1;
    await fetch(`${baseUrl}/posts/${postId}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dislikes: updatedDislikes }),
    });
    fetchPostDetails();
  };

  const handleEdit = async () => {
    const updatedTitle = prompt("Insira novo título:", post.title);
    const updatedDescription = prompt(
      "Insira nova descrição:",
      post.description,
    );
    await fetch(`${baseUrl}/posts/${postId}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedTitle,
        description: updatedDescription,
      }),
    });
    fetchPostDetails();
  };

  const handleDelete = async () => {
    await fetch(`${baseUrl}/posts/${postId}.json`, {
      method: "DELETE",
    });
    navigate("/posts");
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  if (!post) {
    return <p>Nenhum post encontrado.</p>;
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

  if (!post) {
    return <p>Carregando...</p>;
  }

  // return (
  //   <div style={{ padding: "2rem" }}>
  //     <div style={styles.container}>
  //       <div style={styles.title}>{post.title}</div>
  //       <div style={styles.description}>{post.description}</div>
  //       <div style={styles.meta}>
  //         <span>By: {post.username}</span>
  //         <span> | </span>
  //         <span>{new Date(post.date).toLocaleString()}</span>
  //         <span> | </span>
  //         <span>{post.comments.length} comments</span>
  //         <span> | </span>
  //         <span>{post.likes} likes</span>
  //         {currentUser.userId === post.userId && (
  //           <>
  //             <span> | </span>
  //             <span>{post.dislikes} dislikes</span>
  //           </>
  //         )}
  //       </div>
  //       <div style={styles.comments}>
  //         <div style={styles.commentTitle}>Comments:</div>
  //         {/* {post.comments.map((comment, index) => (
  //           <CommentCard key={index} comment={comment} />
  //         ))} */}
  //         <CommentsList comments={post.comments} />
  //       </div>
  //     </div>
  //   </div>
  // );

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
        {currentUser.userId && (
          <div style={styles.actions} onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              style={styles.commentInput}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Adcione um comentário..."
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
        <div>
          <h2>Comments</h2>
          <CommentsList comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailsScreen;
