import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/authActions';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
        <Link to="/register" style={styles.link}>Registre-se</Link>
      </div>
    </div>
  );
};

export default LoginScreen;

