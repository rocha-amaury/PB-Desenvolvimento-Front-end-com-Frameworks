import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postsReducer from './postsSlice'; 

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  
});

export default rootReducer;