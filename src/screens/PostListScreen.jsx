import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/reducers/postsSlice";
import PostsList from "../components/PostsList";

const PostsListScreen = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const currentUser = useSelector((state) => state.auth.user) || {};

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const refreshPosts = () => {
    dispatch(fetchPosts());
  };

  let filteredPosts = posts.filter(post => post.postType === "post");
  filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ padding: "2rem" }}>
      {status === 'loading' && <p>Carregando...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <PostsList
          posts={filteredPosts.slice(0, 10)}          
          currentUser={currentUser}
          refreshPosts={refreshPosts}
        />
      )}
    </div>
  );
};

export default PostsListScreen;
