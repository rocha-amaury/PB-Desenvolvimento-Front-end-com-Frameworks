import { expect } from 'chai';
import { faker } from '@faker-js/faker';
import Post from '../models/Post.js';

describe('Teste Post Class', () => {
  let post;
  let title, description, userId, username, userKey, keywords;

  beforeEach(() => {
    title = 'Test Title';
    description = 'Test Description';
    userId = faker.string.uuid();
    username = 'Test User';
    userKey = 'TestUserKey';
    keywords = ['test', 'post'];
    post = new Post(title, description, userId, username, userKey, keywords);
  });

  it('Deve criar um post com os dados corretos', () => {
    expect(post).to.have.property('postId').that.is.a('string');
    expect(post).to.have.property('title', title);
    expect(post).to.have.property('description', description);
    expect(post).to.have.property('date').that.is.a('string');
    expect(post).to.have.property('userId', userId);
    expect(post).to.have.property('username', username);
    expect(post).to.have.property('userKey', userKey);
    expect(post).to.have.property('keywords').that.deep.equals(keywords);
    expect(post).to.have.property('comments').that.is.an('array').that.is.empty;
    expect(post).to.have.property('likes', 0);
    expect(post).to.have.property('dislikes', 0);
  });

  it('Deve incrementar a quantidade de likes', () => {
    post.addLike();
    expect(post.likes).to.equal(1);
  });

  it('Deve decrementar a quantidade de likes', () => {
    post.addLike();
    post.removeLike();
    expect(post.likes).to.equal(0);
  });

  it('Não deve decrementar a quantidade de likes se likes for igual a zero', () => {
    post.removeLike();
    expect(post.likes).to.equal(0);
  });

  it('Deve incrementar a quantidade de dislikes', () => {
    post.addDislike();
    expect(post.dislikes).to.equal(1);
  });

  it('Deve decrementar a quantidade de dislikes', () => {
    post.addDislike();
    post.removeDislike();
    expect(post.dislikes).to.equal(0);
  });

  it('Não deve decrementar a quantidade de dislikes se dislikes for igual a zero', () => {
    post.removeDislike();
    expect(post.dislikes).to.equal(0);
  });

  it('Deve acrescentar um comentário', () => {
    const comment = 'This is a comment';
    post.addComment(comment);
    expect(post.comments).to.have.lengthOf(1);
    expect(post.comments[0]).to.equal(comment);
  });

  it('Deve remover um comentário por seu índice', () => {
    const comment1 = 'First comment';
    const comment2 = 'Second comment';
    post.addComment(comment1);
    post.addComment(comment2);
    post.removeComment(0);
    expect(post.comments).to.have.lengthOf(1);
    expect(post.comments[0]).to.equal(comment2);
  });
});
