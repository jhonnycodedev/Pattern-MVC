const express = require('express');
const router = express.Router();
const database = require('./../database/models');

//------------------------------------------------------------------------------------------//
// rota para listaR todos

router.get('/product',async (req, res) =>{
    const product = await database.Product.findAll({

    //attributes: ['id','name','category','price','createdAt','updatedAt'], DESMARQUE PARA SELECIONAR QUAIS COLUNAS QUER
    order: [['id']] 
    //order: [['id', 'DESC']] PARA LISTAR EM ORDEM DECRESCENTE

    });
    if(product){
        return res.json({ product: product});
    }else{
        return res.status(400).json({ mensagem:'Errro ao listar Produtos'});
        
    }
});

//------------------------------------------------------------------------------------------//
//ROTA LISTAR PRODUTOS POR ID NA URL

router.get('/product/:id',async (req, res) =>{

    //receber o parametro recebido na URL
    const { id } = req.params;
    console.log(id);
    const product = await database.Product.findOne({

        attributes: ['id','name','category','price','createdAt','updatedAt'],
        where: {id},

    });
   
    if(product){
        return res.json({
            product : product.dataValues
        }); 

    }else{
        return res.status(400).json({ 
            mensagem:'Erro ao procurar Produto'
        });
    }
});
//------------------------------------------------------------------------------------------//
// rota cadastrar

router.post("/product", async (req,res) => {
    
    //recebeer os dados enviados no corpo da requizição
    var dados = req.body;
    console.log(dados);
    
     try{
       
        const user =   await database.Product.create(dados);
        res.status(201).json({
        mensagem: "Produto cadastrado com sucesso!",
        });
        
    }catch(error){
        console.error('Errro ao cadastrar Produto', error);
        res.status(500).json({ error: 'Ocorreu um erro durante a criação do Produto.' });
    };
   
});

//------------------------------------------------------------------------------------------//
module.exports = router;