const express = require('express');
const router = express.Router();


//------------------------------------------------------------------------------------------//
// rota para listaR todos

router.get('/product', async (req, res) => {
    const result = await productService.getAllProducts();
  
    if (result.success) {
      res.json({ products: result.products });
    } else {
      res.status(500).json({ message: 'Erro ao obter produtos.' });
    }
  });

//------------------------------------------------------------------------------------------//
//ROTA LISTAR PRODUTOS POR ID NA URL

router.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const result = await productService.getProductById(id);
  
    if (result.success) {
      res.json({ product: result.product });
    } else {
      res.status(400).json({ mensagem: result.error });
    }
  });

//------------------------------------------------------------------------------------------//
// rota cadastrar

router.post('/product', async (req, res) => {

    const result = await productService.createProduct(req.body);
  
    if (result.success) {
      res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!' });
    } else {
      res.status(500).json({ message: 'Erro ao cadastrar produto.' });
    }
  });

//------------------------------------------------------------------------------------------//
module.exports = router;