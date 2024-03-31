import React from 'react';

function Post({ title, content, author, date, keywords, commentsCount, likesCount, dislikesCount }) {
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Por: {author}</p>
      <p>Data: {date}</p>
      <p>Palavras-chave: {keywords}</p>
      <p>Comentários: {commentsCount}</p>
      <p>Curtidas: {likesCount}</p>
      <p>Descurtidas: {dislikesCount}</p>
      {/* Adicione aqui os botões de interação, como curtir, descurtir, comentar, etc. */}
    </div>
  );
}

export default Post;
