// app.js
const express = require('express');
const app = express();
const port = 8080;
const userService = require('./services/userService');
const productController = require('./controllers/product');
app.use(express.json());

//----------------------------------------------------------------------------------------//
//TODAS AS ROTAS DE USERS
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
// Rota protegida para obter todos os usuários pelo Token da profile

app.get('/users', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const result = await userService.getUserProfile(token);
    if (result.success) {
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
    res.status(401).json({ message: 'Não autorizado' });
  }
});


// ROTA LISTAR USUÁRIOS POR TOKEN NA REQUISIÇÃO
// Endpoint protegido

app.get('/perfil', (req, res) => {
  // Obter o cabeçalho de autorização da solicitação
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Extrair o token JWT do cabeçalho de autorização
    const token = authHeader.split(' ')[1];

    // Chamar a função getUserProfile para obter as informações do usuário
    userService.getUserProfile(token).then((result) => {

      if (result.success) {
        // Enviar o objeto de usuário de volta para o cliente
        res.json({ user: result.user });
      } else {
        // Enviar uma resposta de erro se o token for inválido
        res.status(401).json({ message: result.error });
      }
    });

  }else {
    // Enviar uma resposta de erro se o cabeçalho de autorização não estiver presente
    res.status(401).json({ message: 'Não autorizado' });
  }
});

//FIM DAS ROTAS DA USERS
//----------------------------------------------------------------------------------------//
//INICIO DAS ROTAS DE PRODUCT

// REQUISIÇÕES DA MODEL PRODUCT
app.use('/', productController);




//FIM DAS ROTAS DE PRODUCT
//----------------------------------------------------------------------------------------//

// RESPOSTAS DO SERVIDOR
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port} http://localhost:${port}`);
});
