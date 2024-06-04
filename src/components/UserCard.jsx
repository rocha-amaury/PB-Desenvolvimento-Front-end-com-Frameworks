import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const styles = {
    card: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      maxWidth: "300px",
      textAlign: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease",
      margin: "10px",
      cursor: "pointer",
    },
    avatar: {
      borderRadius: "50%",
      width: "100px",
      height: "100px",
      objectFit: "cover",
    },
    name: {
      fontSize: "1.5em",
      margin: "10px 0",
    },
    username: {
      color: "#666",
      fontStyle: "italic",
    },
    email: {
      color: "#333",
      margin: "5px 0",
    },
    points: {
      fontWeight: "bold",
      margin: "10px 0",
    },
    badges: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "5px",
    },
    badge: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "12px",
      fontSize: "0.8em",
    },
  };

  return (
    <div style={styles.card} onClick={() => navigate(`/users/${user.key}`)}>
      <img
        src={user.avatar}
        alt={`${user.username}'s avatar`}
        style={styles.avatar}
      />
      <h2 style={styles.name}>{user.name}</h2>
      <p style={styles.username}>@{user.username}</p>
      <p style={styles.email}>{user.email}</p>
      <p style={styles.points}>Points: {user.points}</p>
      <div style={styles.badges}>
        {user.badges.map((badge) => (
          <span key={badge} style={styles.badge}>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
