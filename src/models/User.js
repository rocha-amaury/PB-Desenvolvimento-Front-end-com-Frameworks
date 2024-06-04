class User {
  constructor(userId, username, name, email, avatar, password, points = 0, badges = []) {
    this.userId = userId;
    this.username = username;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.password = password;
    this.photo = photo;
    this.points = points;
    this.badges = badges;
  }

  updatePoints(actionType) {
    const pointsMap = {
      'topic_posted': 3,
      'comment_posted': 2,
      'like_given': 1
    };
    this.points += pointsMap[actionType] || 0;
  }

  assignBadges() {
    
  }
}

export default User;
