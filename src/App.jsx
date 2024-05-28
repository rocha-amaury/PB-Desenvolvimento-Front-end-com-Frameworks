import "@fontsource/roboto";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from "./layout/Header/Header.jsx";
import PostListScreen from "./screens/PostListScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import SignUpScreen from "./screens/SignUpScreen.jsx";
import UsersListScreen from "./screens/UsersListScreen.jsx";
import UsersInsertScreen from "./screens/UsersInsertScreen.jsx";

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
            <Route path="/users" element={<UsersListScreen />} /> 
            <Route path="/userCreate" element={<UsersInsertScreen />} />   
          </Routes>
        </div>
      </BrowserRouter>
  );
}
