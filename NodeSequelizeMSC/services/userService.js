// userService.js
const database = require('./../database/models');
const jwt = require('jsonwebtoken');

class UserService {

  //----------------------------------------------------------------------------------------//

  async createUser(data) {
    try {
      const user = await database.Users.create(data);
      return { success: true, user };
    } catch (error) {
      console.error('Erro ao cadastrar usuário', error);
      return { success: false, error: 'Ocorreu um erro durante a criação do usuário.' };
    }
  }


  //----------------------------------------------------------------------------------------//

  async loginUser(email, senha) {
    const user = await database.Users.findOne({ where: { email, senha } });
  
    if (!user || !(await user.checkPassword(senha))) {
      return { success: false, message: 'Credenciais inválidas.' };
    }
  
    const token = jwt.sign({ id: user.id }, 'seuSegredo', { expiresIn: '1h' });
    
    return { success: true, token };
  }
  

  //----------------------------------------------------------------------------------------//

  async getAllUsers() {
    const users = await database.Users.findAll({
      order: [['id']],
    });

    return { success: true, users};
  };


  //----------------------------------------------------------------------------------------//

  async getUserProfile(token) {
    try {
      // Verificar o token JWT com a chave secreta
      const decodedToken = jwt.verify(token, 'seuSegredo');

      // Obter o ID do usuário do token decodificado
      const userId = decodedToken.id;

      // Encontrar o usuário pelo ID no banco de dados
      const user = await database.Users.findOne({ where: { id: userId } });

      // Retornar o objeto de usuário
      return { success: true, user };
    } catch (error) {
      // Retornar uma resposta de erro se o token for inválido
      return { success: false, error: 'Token inválido' };
    }
  }
}

//----------------------------------------------------------------------------------------//

module.exports = new UserService();
