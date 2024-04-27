import React from "react";

export default function UserProfileScreen({ username, points, badges }) {
  return (
    <div className="user-profile" style={styles.container}>
      <h2>Perfil de Usuário</h2>
      <p>Usuário: {username}</p>
      <p>Pontos: {points}</p>
      <p>Conquistas: {badges.join(", ")}</p>
    </div>
  );
}

const styles = {
  container: {
    border: "1px solid #ccc",
    padding: "1rem",
    margin: "1rem 0",
  },
};

