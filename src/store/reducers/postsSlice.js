import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { convertData } from "../../utils.js";

const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(`${baseUrl}/posts.json`);
  const data = await response.json();
  return Object.keys(data).map(key => ({ id: key, ...data[key] }));
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    updatePost(state, action) {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      state.posts[index] = action.payload;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
