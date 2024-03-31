import React from "react";

function UserProfile({ username, points, badges }) {
  return (
    <div className="user-profile">
      <h2>Perfil de Usuário</h2>
      <p>Usuário: {username}</p>
      <p>Pontos: {points}</p>
      <p>Conquistas: {badges.join(", ")}</p>
    </div>
  );
}

export default UserProfile;
