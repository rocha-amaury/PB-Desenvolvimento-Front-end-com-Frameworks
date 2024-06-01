// import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';

// const PostCard = ({ post, currentUser = {}, refreshPosts }) => {
//   const history = useHistory();
//   const [comment, setComment] = useState("");
//   const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

//   const handleComment = async () => {
//     if (!comment) return;
//     const newComment = {
//       text: comment,
//       userId: currentUser.userId,
//       username: currentUser.username,
//       date: new Date().toISOString(),
//     };
//     const updatedComments = [...post.comments, newComment];
//     await fetch(`${baseUrl}/posts/${post.id}.json`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ comments: updatedComments }),
//     });
//     setComment("");
//     refreshPosts();
//   };

//   const handleLike = async () => {
//     const updatedLikes = post.likes + 1;
//     await fetch(`${baseUrl}/posts/${post.id}.json`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ likes: updatedLikes }),
//     });
//     refreshPosts();
//   };

//   const handleDislike = async () => {
//     const updatedDislikes = post.dislikes + 1;
//     await fetch(`${baseUrl}/posts/${post.id}.json`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ dislikes: updatedDislikes }),
//     });
//     refreshPosts();
//   };

//   const handleEdit = async () => {
//     const updatedTitle = prompt("Enter new title:", post.title);
//     const updatedDescription = prompt(
//       "Enter new description:",
//       post.description,
//     );
//     await fetch(`${baseUrl}/posts/${post.id}.json`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: updatedTitle,
//         description: updatedDescription,
//       }),
//     });
//     refreshPosts();
//   };

//   const handleDelete = async () => {
//     await fetch(`${baseUrl}/posts/${post.id}.json`, {
//       method: "DELETE",
//     });
//     refreshPosts();
//   };

//   const styles = {
//     container: {
//       border: "1px solid #e1e8ed",
//       borderRadius: "8px",
//       padding: "1rem",
//       marginBottom: "1rem",
//       backgroundColor: "#fff",
//       maxWidth: "600px",
//       margin: "0 auto",
//       fontFamily: "Helvetica, Arial, sans-serif",
//     },
//     title: {
//       fontSize: "1.25rem",
//       fontWeight: "bold",
//       color: "#1da1f2",
//     },
//     description: {
//       fontSize: "1rem",
//       color: "#555",
//     },
//     meta: {
//       fontSize: "0.8rem",
//       color: "#888",
//       marginTop: "0.5rem",
//     },
//     actions: {
//       marginTop: "1rem",
//       display: "flex",
//       justifyContent: "space-between",
//     },
//     button: {
//       backgroundColor: "#1da1f2",
//       color: "#fff",
//       border: "none",
//       padding: "0.5rem 1rem",
//       borderRadius: "16px",
//       cursor: "pointer",
//       fontSize: "0.9rem",
//     },
//     commentInput: {
//       width: "100%",
//       padding: "0.5rem",
//       borderRadius: "16px",
//       border: "1px solid #e1e8ed",
//       marginBottom: "0.5rem",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>{post.id}</h2>
//       <h2 style={styles.title}>{post.postId}</h2>
      
//       <div style={styles.title}>{post.title}</div>
//       <div style={styles.description}>
//         {post.description.length > 100
//           ? post.description.slice(0, 100) + "..."
//           : post.description}
//       </div>
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
//       {currentUser.userId && (
//         <div style={styles.actions}>
//           <input
//             style={styles.commentInput}
//             type="text"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Write a comment..."
//           />
//           <button style={styles.button} onClick={handleComment}>
//             Comment
//           </button>
//           <button style={styles.button} onClick={handleLike}>
//             Like
//           </button>
//           <button style={styles.button} onClick={handleDislike}>
//             Dislike
//           </button>

//           {currentUser.userId === post.userId && (
//             <>
//               <button style={styles.button} onClick={handleEdit}>
//                 Edit
//               </button>
//               <button style={styles.button} onClick={handleDelete}>
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostCard = ({ post, refreshPosts }) => {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.user) || {};
  const [comment, setComment] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

  const handleComment = async (e) => {
    e.stopPropagation();
    if (!comment) return;
    const newComment = {
      text: comment,
      userId: currentUser.userId || 'anonymous',
      username: currentUser.username || 'Anonymous',
      date: new Date().toISOString(),
    };
    const updatedComments = [...post.comments, newComment];
    await fetch(`${baseUrl}/posts/${post.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comments: updatedComments }),
    });
    setComment('');
    refreshPosts();
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    const updatedLikes = post.likes + 1;
    await fetch(`${baseUrl}/posts/${post.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: updatedLikes }),
    });
    refreshPosts();
  };

  const handleDislike = async (e) => {
    e.stopPropagation();
    const updatedDislikes = post.dislikes + 1;
    await fetch(`${baseUrl}/posts/${post.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dislikes: updatedDislikes }),
    });
    refreshPosts();
  };

  const handleEdit = async (e) => {
    e.stopPropagation();
    const updatedTitle = prompt("Enter new title:", post.title);
    const updatedDescription = prompt("Enter new description:", post.description);
    await fetch(`${baseUrl}/posts/${post.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: updatedTitle,
        description: updatedDescription,
      }),
    });
    refreshPosts();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await fetch(`${baseUrl}/posts/${post.id}.json`, {
      method: 'DELETE',
    });
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
      backgroundColor: "rgba(0,0,0,0.1)",
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
    //<div style={styles.container} onClick={() => navigate(`/posts/${post.id}`)}>
    <div
      style={{ ...styles.container, ...(isHovered && styles.containerHover) }}
      onClick={() => navigate(`/posts/${post.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
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
      {currentUser.userId && (
        <div style={styles.actions} onClick={e => e.stopPropagation()}>
          <input
            type="text"
            style={styles.commentInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button style={styles.button} onClick={handleComment}>Comment</button>
          <button style={styles.button} onClick={handleLike}>Like</button>
          <button style={styles.button} onClick={handleDislike}>Dislike</button>
          {currentUser.userId === post.userId && (
            <>
              <button style={styles.button} onClick={handleEdit}>Edit</button>
              <button style={styles.button} onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
