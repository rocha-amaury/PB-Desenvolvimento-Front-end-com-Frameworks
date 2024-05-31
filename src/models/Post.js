import { faker } from '@faker-js/faker';

  class Post {
    constructor(title, description, userId, username, keywords = []) {
      this.postId = faker.string.uuid();
      this.title = title;
      this.description = description;
      this.date = new Date().toISOString();
      this.userId = userId;
      this.username = username;
      this.keywords = keywords;
      this.comments = [];
      this.likes = 0;
      this.dislikes = 0;
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
