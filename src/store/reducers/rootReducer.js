import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsSlice'; 
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
  
});

export default rootReducer;