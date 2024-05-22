class User {
  constructor(id, username, fullName, email, password, photo = null, points = 0, badges = []) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.email = email;
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
