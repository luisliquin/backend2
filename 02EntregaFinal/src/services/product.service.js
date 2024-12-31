import ProductRepository from '../repository/product.repository.js';
import ProductDTO from '../dto/product.dto.js';

class ProductService {
    async getAllProducts(query) {
        const { page = 1, limit = 10, sort, ...filters } = query;
        const options = {
            page: Number(page),
            limit: Number(limit),
            lean: true,
        };

        if (sort === "asc" || sort === "desc") {
            options.sort = { price: sort === "asc" ? 1 : -1 };
        }

        const paginatedProducts = await ProductRepository.paginateProducts(filters, options);
        return paginatedProducts;
    }

    async getProductById(id) {
        const product = await ProductRepository.getProductById(id);
        return new ProductDTO(product);
    }

    async createProduct(data) {
        const product = await ProductRepository.createProduct(data);
        return new ProductDTO(product);
    }

    async updateProduct(id, productUpdate) {
        const updatedProduct = await ProductRepository.updateProduct(id, productUpdate);
        return new ProductDTO(updatedProduct);
    }

    async deleteProduct(id) {
        return await ProductRepository.deleteProduct(id);
    }
}

export default new ProductService();
