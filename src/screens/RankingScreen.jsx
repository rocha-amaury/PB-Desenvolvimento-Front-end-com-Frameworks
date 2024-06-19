import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RankingScreen = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/users.json`);
      if (!response.ok) {
        throw new Error('Falha ao carregar usuários.');
      }
      const userData = await response.json();
      const usersArray = Object.keys(userData).map(key => ({ key: key, ...userData[key] }));
      usersArray.sort((a, b) => b.points - a.points);
      setUsers(usersArray);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Helvetica, Arial, sans-serif',
    },
    header: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: '1px solid #ddd',
      cursor: 'pointer', 
    },
    avatar: {
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      marginRight: '1rem',
    },
    name: {
      flex: 1,
    },
    points: {
      fontWeight: 'bold',
    },
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>Ranking de Pontuações</div>
      <ul style={styles.list}>
        {users.map((user, index) => (
          <li 
            key={user.key} 
            style={styles.listItem} 
            onClick={() => navigate(`/users/${user.key}`)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={user.avatar} alt={`${user.username}'s avatar`} style={styles.avatar} />
              <div style={styles.name}>
                <div>{user.name}</div>
                <div style={{ color: '#888' }}>@{user.username}</div>
              </div>
            </div>
            <div style={styles.points}>{user.points} pontos</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingScreen;
