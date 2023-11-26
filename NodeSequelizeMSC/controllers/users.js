// users.js (Controller)
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const authMiddleware = require('../services/authMiddleware');

//----------------------------------------------------------------------------------------//
// ROTA CADASTRAR SEM AUTENTICAÇÃO
router.post('/users',  async (req, res) => {
  const result = await userService.createUser(req.body);

  if (result.success) {
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } else {
    res.status(500).json({ error: result.error });
  }
});

//----------------------------------------------------------------------------------------//
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

//----------------------------------------------------------------------------------------//
// ROTA LISTAR TODOS USUARIOS FORNECENDO O TOKEN DO PERFIL

router.get('/users', async (req, res) => {
  // Obter o cabeçalho de autorização da solicitação
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extrair o token JWT do cabeçalho de autorização
    const token = authHeader.split(' ')[1];

    // Chamar a função getUserProfile para validar e obter informações do usuário
    const result = await userService.getUserProfile(token);

    if (result.success) {
      // Se a validação do token for bem-sucedida, continuar com a lógica de obter todos os usuários
      const usersResult = await userService.getAllUsers();

      if (usersResult.success) {
        res.json({ users: usersResult.users });
      } else {
        res.status(500).json({ message: 'Erro ao obter usuários.' });
      }
    } else {
      res.status(401).json({ message: result.error });
    }
  } else {
    // Enviar uma resposta de erro se o cabeçalho de autorização não estiver presente
    res.status(401).json({ message: 'Não autorizado' });
  }
});

//----------------------------------------------------------------------------------------//
// ROTA LISTAR USUÁRIOS POR TOKEN NA REQUISIÇÃO

router.get('/perfil', async (req, res) => {
  // Obter o cabeçalho de autorização da solicitação
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extrair o token JWT do cabeçalho de autorização
    const token = authHeader.split(' ')[1];

    // Chamar a função getUserProfile para obter as informações do usuário
    const result = await userService.getUserProfile(token);

    if (result.success) {
      res.json({ user: result.user });
    } else {
      res.status(401).json({ message: result.error });
    }
  } else {
    // Enviar uma resposta de erro se o cabeçalho de autorização não estiver presente
    res.status(401).json({ message: 'Não autorizado' });
  }
});


module.exports = router;
