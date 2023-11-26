// productService.js
const database = require('./../database/models');

class ProductService {
  async getAllProducts() {
    try {
      const products = await database.Product.findAll({
        order: [['id']],
      });
      return { success: true, products };
    } catch (error) {
      console.error('Erro ao obter produtos', error);
      return { success: false, error: 'Ocorreu um erro ao obter produtos.' };
    }
  }

  async getProductById(id) {
    try {
      const product = await database.Product.findOne({
        attributes: ['id', 'name', 'category', 'price', 'createdAt', 'updatedAt'],
        where: { id },
      });
      if (product) {
        return { success: true, product: product.dataValues };
      } else {
        return { success: false, error: 'Produto não encontrado.' };
      }
    } catch (error) {
      console.error('Erro ao obter produto por ID', error);
      return { success: false, error: 'Ocorreu um erro ao obter produto por ID.' };
    }
  }

  async createProduct(data) {
    try {
      await database.Product.create(data);
        return { success: true, message: 'Produto cadastrado com sucesso!' };
    } catch (error) {
        console.error('Erro ao cadastrar produto', error);
        console.log(error)
        return { success: false, error: 'Ocorreu um erro durante a criação do produto.' };
    }
  }
}

module.exports = new ProductService();
