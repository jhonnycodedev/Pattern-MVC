// userService.js
const database = require('./../database/models');
const jwt = require('jsonwebtoken');

class UserService {

  async createUser(data) {
    try {
      const user = await database.Users.create(data);
      return { success: true, user };
    } catch (error) {
      console.error('Erro ao cadastrar usuário', error);
      return { success: false, error: 'Ocorreu um erro durante a criação do usuário.' };
    }
  }

  async loginUser(email, senha) {
    const user = await database.Users.findOne({ where: { email, senha } });
  
    if (!user || !(await user.checkPassword(senha))) {
      return { success: false, message: 'Credenciais inválidas.' };
    }
  
    const token = jwt.sign({ id: user.id }, 'seuSegredo', { expiresIn: '1h' });
    
    return { success: true, token };
  }
  
  async getAllUsers() {
    const users = await database.Users.findAll({
      order: [['id']],
    });

    return { success: true, users};
  };

  async getUserByMail(email){
    const user = await database.Users.findOne({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      where: {email },
    });

    return user ? { success: true, user: user.dataValues } : { success: false, message: 'Usuário não encontrado.' };
  };
}

module.exports = new UserService();
