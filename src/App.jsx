import "@fontsource/roboto";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from "./layout/Header/Header.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import SignUpScreen from "./screens/SignUpScreen.jsx";
import UsersListScreen from "./screens/UsersListScreen.jsx";
import UsersInsertScreen from "./screens/UsersInsertScreen.jsx";
import PostListScreen from "./screens/PostListScreen.jsx";
import PostDetailsScreen from './screens/PostDetailsScreen.jsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './store/reducers/postsSlice';
import PostAddScreen from './screens/PostAddScreen.jsx';
import PrivateRoute from './components/PrivateRoute';
import UserProfileScreen from './screens/UserProfileScreen.jsx';
import RankingScreen from './screens/RankingScreen';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
    return (   
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            
            <Route path="/posts" element={<PostListScreen />} />
            <Route path="/posts/:postId" element={<PostDetailsScreen />} />
            
            <Route
              path="/add-post"
              element={
                <PrivateRoute>
                  <PostAddScreen />
                </PrivateRoute>
              }
            />

            <Route path="/users" element={<UsersListScreen />} /> 
            <Route path="/users/:userId" element={<UserProfileScreen />} /> 
            <Route path="/ranking" element={<RankingScreen />} /> 
            
            <Route path="/login" element={<LoginScreen />} />     
            <Route path="/register" element={<UsersInsertScreen />} />   
          </Routes>
        </div>
      </BrowserRouter>
  );
}


