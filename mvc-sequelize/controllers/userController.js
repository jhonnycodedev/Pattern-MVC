//chamar biblioteca EXPRESS
const express = require('express');
//chamar a função express
const router = express.Router();



//CRIAR ROTA CADASTRAR
router.post("/users", async (req,res) => {
  return res.json({
    mensagem: "Usuário cadastrado com suscesso!"
  });
});


module.export = router;