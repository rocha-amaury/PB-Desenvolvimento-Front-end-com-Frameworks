// const initialState = {
//   user: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { ...state, user: action.payload };
//     case 'LOGOUT':
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// };

// export default authReducer;


const initialState = {
  user: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
