// users.js (Controller)
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const authMiddleware = require('../services/authMiddleware');

// ROTA CADASTRAR com autenticação
router.post('/users',  async (req, res) => {
  const result = await userService.createUser(req.body);

  if (result.success) {
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// ROTA LOGIN
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const result = await userService.loginUser(email, senha);
  
  if (result.success) {
    res.json({ token: result.token });
  } else {
    res.status(401).json({ message: "Usuario não logado"});
  }
});

// ROTA LISTAR TODOS
router.get('/users', async (req, res) => {
  const result = await userService.getAllUsers();

  if (result.success) {
    res.json({ users: result.users });
  } else {
    res.status(400).json({ mensagem: 'Erro ao listar usuários' });
  }
});

// ROTA LISTAR USUÁRIOS POR ID NA URL
router.get('/users/:mail', async (req, res) => {
  const result = await userService.getUserMail(req.params.mail);

  if (result.success) {
    res.json({ user: result.user });
  } else {
    res.status(400).json({ mensagem: result.message });
  }
});

module.exports = router;
