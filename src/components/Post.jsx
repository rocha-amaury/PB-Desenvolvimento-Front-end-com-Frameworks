import React from 'react';

export default function Post({ title, content, author, date, keywords, commentsCount, likesCount, dislikesCount }) {
  return (
    <div className="post" style={styles.container}>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Por: {author}</p>
      <p>Data: {date}</p>
      <p>Palavras-chave: {keywords}</p>
      <p>Comentários: {commentsCount}</p>
      <p>Curtidas: {likesCount}</p>
      <p>Descurtidas: {dislikesCount}</p>
    </div>
  );
}

const styles = {
  container: {
    border: "1px solid #ccc",
    padding: "1rem",
    margin: "1rem 0",
  },
};
