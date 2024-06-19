import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../store/reducers/postsSlice';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';

const PostAddScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.auth.user) || {};
  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";


  const updateUserPoints = async (userKey, points) => {
    const userResp = await fetch(`${baseUrl}/users/${userKey}.json`);
    const user = await userResp.json();
    const updatedPoints = user.points + points;
    await fetch(`${baseUrl}/users/${userKey}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points: updatedPoints }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      postType: "post",
      postId: faker.string.uuid(),
      title,
      description,
      date: new Date().toISOString(),
      userKey: currentUser.key,
      userId: currentUser.userId,
      username: currentUser.username,
      keywords: keywords.split(',').map(k => k.trim()),
      likes: 0,
      dislikes: 0,
      reports: 0,
    };

    const response = await fetch(`${baseUrl}/posts.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    const data = await response.json();
    dispatch(addPost({ ...newPost, id: data.name }));

    await updateUserPoints(currentUser.key, 3);

    setTitle('');
    setDescription('');
    setKeywords('');

    navigate('/posts');
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      margin: '0.5rem 0',
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    button: {
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Faça um novo Post</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Palavras Chave (separadas por vírgula)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Salvar Post
        </button>
      </form>
    </div>
  );
};

export default PostAddScreen;
