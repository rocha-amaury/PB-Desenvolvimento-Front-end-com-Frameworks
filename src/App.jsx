import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import PostList from './components/PostList';
// import Navbar from './components/Navbar';
// import UserProfile from './components/UserProfile';
import { fetchData } from './api/api';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const filePath = 'src/data/posts.json';
    fetchData(filePath)
      .then(data => setPosts(data)) 
      .catch(error => console.error('Erro ao buscar os dados:', error));
  }, []);

  // const userData = {
  //   username: 'exemplo',
  //   points: 100,
  //   badges: ['Iniciante', 'Contribuidor']
  // };

  return (
    <div className="App">
      <Login />
      {/* <UserProfile {...userData} /> */}
      <PostList posts={posts} />
    </div>
  );
}

export default App;
