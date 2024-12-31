import ProductManagerDB from '../dao/ProductManagerDB.js';

class ProductRepository {
    async getAllProducts() {
        return await ProductManagerDB.getAll();
    }

    async getProductById(id) {
        return await ProductManagerDB.getById(id);
    }

    async createProduct(product) {
        return await ProductManagerDB.create(product);
    }

    async updateProduct(id, productUpdate) {
        return await ProductManagerDB.update(id, productUpdate);
    }

    async deleteProduct(id) {
        return await ProductManagerDB.delete(id);
    }

    async paginateProducts(filter, options) {
        return await ProductManagerDB.paginate(filter, options);
    }
}

export default new ProductRepository();
