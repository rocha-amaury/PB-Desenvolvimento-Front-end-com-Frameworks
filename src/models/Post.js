import { faker } from '@faker-js/faker';

class Post {
  constructor(userId, text) {
    this.postId = faker.string.uuid();
    this.userId = userId;
    this.text = text;
    this.likes = 0;
    this.dislikes = 0;
    this.comments = [];
    this.createdAt = new Date();
  }

  addLike() {
    this.likes++;
  }

  removeLike() {
    if (this.likes > 0) {
      this.likes--;
    }
  }

  addDislike() {
    this.dislikes++;
  }

  removeDislike() {
    if (this.dislikes > 0) {
      this.dislikes--;
    }
  }

  addComment(comment) {
    this.comments.push(comment);
  }

  removeComment(commentIndex) {
    this.comments.splice(commentIndex, 1);
  }
}

export default Post;
