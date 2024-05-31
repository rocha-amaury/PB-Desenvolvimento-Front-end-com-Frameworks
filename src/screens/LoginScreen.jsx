// import React, { useState, useEffect } from 'react';
// import { fetchUsers } from '../utils.jsx';

// export default function LoginScreen() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [error, setError] = useState('');
  
//   const [userData, setUserData] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [isLoading, setLoading] = useState(true);

//   const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

//   useEffect(() => {
//     async function getUsers() {
//       try {
//         const fetchedUsers = await fetchUsers(baseUrl);
//         setUserData(fetchedUsers);
//         setLoading(false);
//       } catch (error) {
//         setMessage(error.message);
//         setLoading(false);
//       }
//     }
//     getUsers();
//   }, []);

//   function handleLogin() {
//     setError(''); 

//     const user = userData.users.find(user => user.username === username && user.password === password);

//     if (user) {
//       console.log(`Login bem-sucedido. Bem-vindo, ${user.username}!`);
//       setIsLoggedIn(true);
//     } else {
//       setError('Usuário ou senha incorretos. Por favor, tente novamente.');
//     }
//   }



//   function handleLogout() {
//     setUsername('');
//     setPassword('');
//     setIsLoggedIn(false);
//   }

//   function handleRegister() {
//     const userExists = userData.users.some(user => user.username === username);

//     if (userExists) {
//       setError('Este nome de usuário já está em uso. Por favor, escolha outro.');
//     } else {
//       const newUser = {
//         id: userData.users.length + 1,
//         username: username,
//         password: password
//       };

//       userData.users.push(newUser);
//       console.log(`Usuário ${username} registrado com sucesso!`);

//       setUsername('');
//       setPassword('');
//     }
//   }

//   return (
//     <div className="login" style={styles.container}>
//       <h1>Meu Fórum</h1>
//       {isLoggedIn ? (
//         <div className="nav-links">
//           <span>Bem-vindo, {username}!</span>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div className="nav-links">
//           <input
//             type="text"
//             placeholder="Nome de usuário"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Senha"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleLogin}>Login</button>
//           <button onClick={handleRegister}>Registrar</button>
//         </div>
//       )}
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     backgroundColor: "#333",
//     color: "#fff",
//     padding: "1rem",
//     textAlign: "center",
//   },
// };

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/authActions';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  message: {
    marginBottom: '1rem',
    color: 'red',
  },
  link: {
    marginTop: '1rem',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '0.9rem',
  }
};

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }, setMessage));
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Login</h2>
        {message && <p style={styles.message}>{message}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>Login</button>
        <Link to="/register" style={styles.link}>Register New User</Link>
      </div>
    </div>
  );
};

export default LoginScreen;

