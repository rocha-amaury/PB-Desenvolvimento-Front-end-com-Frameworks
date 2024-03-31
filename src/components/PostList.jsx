import React from 'react';
import Post from './Post';

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
}

export default PostList;
