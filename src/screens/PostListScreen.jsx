import React, { useEffect, useState } from "react";
import PostsList from "../components/PostsList";
import { convertData } from "../utils";
import { useSelector } from "react-redux";

const PostsListScreen = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const currentUser = useSelector(state => state.auth.user) || {};

  const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

  // useEffect(() => {
  //   fetch(`${baseUrl}/posts.json`)
  //     .then(async (resp) => {
  //       const respPosts = await resp.json();
  //       let convertedPosts = convertData(respPosts);
  //       convertedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  //       setPosts(convertedPosts.slice(0, 10));
  //     })
  //     .catch((err) => setMessage(err.message))
  //     .finally(() => setLoading(false));
  // }, []);

  const fetchPosts = async () => {
    try {
      const resp = await fetch(`${baseUrl}/posts.json`);
      const respPosts = await resp.json();
      let convertedPosts = convertData(respPosts);
      convertedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(convertedPosts.slice(0, 10));
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const refreshPosts = () => {
    setLoading(true);
    fetchPosts();
  };

  return (
    <div style={{ padding: "2rem" }}>
      {isLoading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {/* {!isLoading && <PostsList posts={posts} currentUser={currentUser} />} */}
      {!isLoading && (
        <PostsList
          posts={posts}
          currentUser={currentUser}
          refreshPosts={refreshPosts}
        />
      )}
    </div>
  );
};

export default PostsListScreen;
