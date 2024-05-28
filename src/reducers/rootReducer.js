// reducers/rootReducer.js
import { combineReducers } from 'redux';
// import userReducer from './userReducer';
// import postReducer from './postReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  // user: userReducer,
  // post: postReducer,
  login: loginReducer,

});

export default rootReducer;
