import { getUsers } from '../services/userService';

export const loginUser = (credentials, setMessage) => async (dispatch) => {
  try {
    const users = await getUsers();    
    const user = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );
    if (user) {
      dispatch({
        type: 'LOGIN_USER',
        payload: user,
      });
      setMessage('Login successful');
    } else {
      setMessage('Invalid credentials');
    }
  } catch (error) {
    setMessage('An error occurred while logging in');
  }
};
