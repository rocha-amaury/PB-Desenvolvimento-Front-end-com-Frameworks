import React, { useState } from 'react';

import userData from '../data/usersData.json'; 

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  function handleLogin() {
    setError(''); 

    const user = userData.users.find(user => user.username === username && user.password === password);

    if (user) {
      console.log(`Login bem-sucedido. Bem-vindo, ${user.username}!`);
      setIsLoggedIn(true);
    } else {
      setError('Usuário ou senha incorretos. Por favor, tente novamente.');
    }
  }

  function handleLogout() {
    setUsername('');
    setPassword('');
    setIsLoggedIn(false);
  }

  function handleRegister() {
    const userExists = userData.users.some(user => user.username === username);

    if (userExists) {
      setError('Este nome de usuário já está em uso. Por favor, escolha outro.');
    } else {
      const newUser = {
        id: userData.users.length + 1,
        username: username,
        password: password
      };

      userData.users.push(newUser);
      console.log(`Usuário ${username} registrado com sucesso!`);

      setUsername('');
      setPassword('');
    }
  }

  return (
    <div className="login" style={styles.container}>
      <h1>Meu Fórum</h1>
      {isLoggedIn ? (
        <div className="nav-links">
          <span>Bem-vindo, {username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="nav-links">
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Registrar</button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
  },
};

