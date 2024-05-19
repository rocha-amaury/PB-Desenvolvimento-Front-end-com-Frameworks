import "@fontsource/roboto";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from "./layout/Header/Header.jsx";
import PostListScreen from "./screens/PostListScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import SignUpScreen from "./screens/SignUpScreen.jsx";

export default function App() {

    return (   
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />  
            <Route path="/posts" element={<PostListScreen />} />            
            <Route path="/signup" element={<SignUpScreen />} />            
          </Routes>
        </div>
      </BrowserRouter>
  );
}
