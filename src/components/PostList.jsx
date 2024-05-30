import React from 'react';
import PostCard from './PostCard';

function PostList({ posts }) {
  return (
    <div>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}

export default PostList;
