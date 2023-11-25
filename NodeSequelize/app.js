const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());

//---------------------------------------------------------------------------------------//
//REQUISIÇÕES DA MODEL USERS
const users = require('./controllers/users');
app.use('/', users);

//---------------------------------------------------------------------------------------//
//REQUISIÇÕES DA MODEL PRODUCT
const product = require('./controllers/product');
app.use('/', product);

//---------------------------------------------------------------------------------------//
//RESPOSTAS DO SERVIDOR
app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port} http://localhost:${port}`);
});
