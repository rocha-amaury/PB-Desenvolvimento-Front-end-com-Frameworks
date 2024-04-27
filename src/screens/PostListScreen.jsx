import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/api.jsx';
import PostList from '../components/PostList';

export default function PostListScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const filePath = 'src/data/posts.json';
    fetchData(filePath)
      .then(data => setPosts(data)) 
      .catch(error => console.error('Erro ao buscar os dados:', error));
  }, []);

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}

