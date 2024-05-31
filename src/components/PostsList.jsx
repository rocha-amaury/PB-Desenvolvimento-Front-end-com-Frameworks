import React from 'react';
import PostCard from './PostCard';
import PostCardAntigo from './PostCardAntigo';

const PostsList = ({ posts, currentUser }) => {
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} currentUser={currentUser} />
        // <PostCardAntigo key={post.postId} post={post} currentUser={currentUser} />

      ))}
    </div>
  );
};

export default PostsList;

