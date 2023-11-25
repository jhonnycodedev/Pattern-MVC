//importar bibliotecas
const express = require("express").Router;
//chamar a função expres
const app = express();
//configurar porta
const port = 3000;

//---------------------------------------------------------------------------------------//
// Importa o controller USERS
const users = require('./controllers/userController');
//criar as rotas
app.use('/', users);

//---------------------------------------------------------------------------------------//
// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port} http://localhost:3000`);
});

module.exports = router;