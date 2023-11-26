// app.js
const express = require('express');
const app = express();
const port = 8080;
const userService = require('./services/userService');
const productService = require('./services/productService');
app.use(express.json());

//----------------------------------------------------------------------------------------//
//TODAS AS ROTAS DE USERS
// ROTA CADASTRAR sem autenticação
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



//ROTA PARA CADASTRAR PRODUTO
app.post('/product',  async (req, res) => {
  const result = await productService.createProduct(req.body);

  if (result.success) {
    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!' });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// ROTA PARA LISTAR TODOS OS PRODUTOS DA LISTA

app.get('/produtos', async (req, res) => {
  const result = await productService.getAllProducts();

  if (result.success) {
    const todosOsProdutos = result.products;
    console.log('Todos os produtos:', todosOsProdutos);
    res.json({ products: todosOsProdutos });
  } else {
    res.status(500).json({ message: 'Erro ao obter todos os produtos.' });
  }
});

// ROTA PARA CONSULTAR PRODUTOS POR ID

app.get('/produto/:id', async (req, res) => {
  const { id } = req.params;
  const result = await productService.getProductById(id);

  if (result.success) {
    const produtoEncontrado = result.product;
    console.log('Produto encontrado:', produtoEncontrado);
    res.json({ product: produtoEncontrado });
  } else {
    res.status(400).json({ mensagem: result.error });
  }
});

//FIM DAS ROTAS DE PRODUCT
//----------------------------------------------------------------------------------------//

// RESPOSTAS DO SERVIDOR
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port} http://localhost:${port}`);
});
