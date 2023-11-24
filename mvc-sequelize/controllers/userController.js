class UserController {
    async createUser(req, res) {
      const { name, email, password } = req.body;
  
      try {
        const newUser = await userService.createUser(name, email, password);
        res.status(201).json(newUser);
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Ocorreu um erro durante a criação do usuário.' });
      }
    }
  
    async getUserByEmail(req, res) {
      const { email } = req.params;
  
      try {
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Ocorreu um erro durante a busca do usuário.' });
      }
    }
  }
  
  module.exports = new UserController();
  