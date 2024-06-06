// src/screens/UserProfileScreen.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProfileScreen = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId]);

  const fetchUserProfile = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/users/${id}.json`);
      if (!response.ok) {
        throw new Error('Falha ao carregar perfil do usuário.');
      }
      const userData = await response.json();
      setProfile(userData);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      border: "1px solid #e1e8ed",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#fff",
      maxWidth: "600px",
      margin: "16px auto",
      fontFamily: "Helvetica, Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      borderRadius: "50%",
      width: "150px",
      height: "150px",
      marginBottom: "1rem",
    },
    name: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    username: {
      fontSize: "1.25rem",
      color: "#555",
      marginBottom: "0.5rem",
    },
    email: {
      fontSize: "1rem",
      color: "#888",
      marginBottom: "0.5rem",
    },
    points: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    badges: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.5rem",
    },
    badge: {
      padding: "0.5rem 1rem",
      backgroundColor: "#007bff",
      color: "#fff",
      borderRadius: "4px",
      fontSize: "0.9rem",
    },
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  if (!profile) {
    return <p>Nenhum usuário encontrado.</p>;
  }

  return (
    <>
    <h2>Profile</h2>
    <div style={styles.container}>
      <img src={profile.avatar} alt="Avatar" style={styles.avatar} />
      <div style={styles.name}>{profile.name}</div>
      <div style={styles.username}>@{profile.username}</div>
      <div style={styles.email}>{profile.email}</div>
      <div style={styles.points}>Points: {profile.points}</div>
      <div style={styles.badges}>
        {profile.badges && profile.badges.map((badge, index) => (
          <div key={index} style={styles.badge}>{badge}</div>
        ))}
      </div>
    </div>
    </>
  );
};

export default UserProfileScreen;
