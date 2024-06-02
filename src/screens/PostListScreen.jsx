// import React, { useEffect, useState } from "react";
// import PostsList from "../components/PostsList";
// import { convertData } from "../utils.js";
// import { useSelector } from "react-redux";

// const PostsListScreen = () => {
//   const [posts, setPosts] = useState([]);
//   const [allPosts, setAllPosts] = useState([]);
//   const [message, setMessage] = useState(null);
//   const [isLoading, setLoading] = useState(true);

//   const currentUser = useSelector(state => state.auth.user) || {};

//   const baseUrl = "https://pb-forum-14fbe-default-rtdb.firebaseio.com/";

//   const fetchPosts = async () => {
//     try {
//       const resp = await fetch(`${baseUrl}/posts.json`);
//       const respPosts = await resp.json();
//       let convertedPosts = convertData(respPosts);
//       let filteredPosts = convertedPosts.filter(post => post.postType === "post");
//       filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
//       setPosts(filteredPosts.slice(0, 10));
//       setAllPosts(convertedPosts);
//     } catch (err) {
//       setMessage(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const refreshPosts = () => {
//     setLoading(true);
//     fetchPosts();
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       {isLoading && <p>Loading...</p>}
//       {message && <p>{message}</p>}
//       {/* {!isLoading && <PostsList posts={posts} currentUser={currentUser} />} */}
//       {!isLoading && (
//         <PostsList
//           posts={posts}
//           allPosts={allPosts}
//           currentUser={currentUser}
//           refreshPosts={refreshPosts}
//         />
//       )}
//     </div>
//   );
// };

// export default PostsListScreen;


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
      {status === 'loading' && <p>Loading...</p>}
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
