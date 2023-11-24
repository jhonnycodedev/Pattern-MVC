// services/userService.js
const User = require('../models/user');

class UserService {
  async createUser(name, email, password) {
    return User.create({ name, email, password });
  }

  async getUserByEmail(email) {
    return User.findOne({ where: { email } });
  }
}
module.exports = new UserService();
