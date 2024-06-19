import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import UserList from "../components/UserList";
import { fetchUsers } from '../utils.js';

export default function usersListScreen(props) {
  const action = props.action;

  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

  useEffect(() => {
    async function getUsers() {
      try {
        const fetchedUsers = await fetchUsers(baseUrl);        
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        setMessage(error.message);
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isLoading && <p>Carregando...</p>}
      {message && <p>{message}</p>}
      {/* {users && users.map((user) => <UserCard key={user.userId} user={user} />)} */}
      {users && <UserList users={users} />}
    </div>
  );
}
