// app.js
const express = require('express');
const app = express();
const port = 8080;

const userService = require('./services/userService');
const productController = require('./controllers/product');

app.use(express.json());



// ROTA CADASTRAR com autenticação
app.post('/users',  async (req, res) => {
  const result = await userService.createUser(req.body);

  if (result.success) {
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// ROTA LOGIN
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const result = await userService.loginUser(email, senha);

  if (result.success) {
    res.json({ token: result.token });
  } else {
    res.status(401).json({ message: result.message });
  }
});

// ROTA LISTAR TODOS
app.get('/users', async (req, res) => {
  const result = await userService.getAllUsers();

  if (result.success) {
    res.json({ users: result.users });
  } else {
    res.status(400).json({ mensagem: 'Erro ao listar usuários' });
  }
});

// ROTA LISTAR USUÁRIOS POR ID NA URL
app.get('/users/:mail', async (req, res) => {
  const result = await userService.getUserByMail(req.params.mail);

  if (result.success) {
    res.json({ user: result.user });
  } else {
    res.status(400).json({ mensagem: result.message });
  }
});

// REQUISIÇÕES DA MODEL PRODUCT
app.use('/', productController);

// RESPOSTAS DO SERVIDOR
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port} http://localhost:${port}`);
});
