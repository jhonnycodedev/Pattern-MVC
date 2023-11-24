// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Importa o controller
const userController = require('./controllers/userController');

// Rota para criar um usuário
app.post('/users', async (req, res) => userController.createUser(req, res));

// Rota para buscar um usuário por email
app.get('/users/:email', async (req, res) => userController.getUserByEmail(req, res));

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
