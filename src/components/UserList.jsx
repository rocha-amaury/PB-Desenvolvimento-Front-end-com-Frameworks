import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users }) => {
  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
  };

  return (
    <div style={styles.container}>
      {users.map(user => (
        <UserCard key={user.userId} user={user} />
      ))}
    </div>
  );
};

export default UserList;
