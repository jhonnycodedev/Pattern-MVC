const express = require('express');
const router = express.Router();
const database = require('./../database/models');

//------------------------------------------------------------------------------------------//
//ROTA LISTAR TODOS

router.get('/users',async (req, res) =>{
    const users = await database.Users.findAll({

    //attributes: ['id','name','email'], DESMARQUE PARA SELECIONAR QUAIS COLUNAS QUER
    order: [['id']] 
    //order: [['id', 'DESC']] PARA LISTAR EM ORDEM DECRESCENTE

    });
    if(users){
        return res.json({ users: users});
    }else{
        return res.status(400).json({ mensagem:'Errro ao listar Usuarios'});
        
    }
});


//------------------------------------------------------------------------------------------//
//ROTA LISTAR USUARIOS POR ID NA URL

router.get('/users/:id',async (req, res) =>{

    //receber o parametro recebido na URL
    const { id } = req.params;
    console.log(id);
    const user = await database.Users.findOne({

        attributes: ['id','name','email','createdAt','updatedAt'],
        where: {id},

    });
   
    if(user){
        return res.json({
            user : user.dataValues
        }); 

    }else{
        return res.status(400).json({ 
            mensagem:'Erro ao procurar Usuario'
        });
    }
});

//------------------------------------------------------------------------------------------//
// ROTA CADASTRAR

router.post("/users", async (req,res) => {

    //recebeer os dados enviados no corpo da requizição
    var dados = req.body;
    console.log(dados);
    try{
       
        const user =  await database.Users.create(dados);
        res.status(201).json({
        mensagem: "Usuario cadastrado com sucesso!",
        });
    
    }catch(error){
        console.error('Errro ao cadastrar Usuario', error);
        res.status(500).json({ error: 'Ocorreu um erro durante a criação do usuário.' });
    };
});

//------------------------------------------------------------------------------------------//
module.exports = router;