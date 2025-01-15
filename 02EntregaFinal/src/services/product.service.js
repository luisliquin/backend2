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
        
        if (!updatedProduct) {
            throw new NotFoundError(`El producto con ID ${id} no existe.`);
        }

        return new ProductDTO(updatedProduct);
    }

    async deleteProduct(id) {
        return await ProductRepository.deleteProduct(id);
    }

    async updateProductStock(id, quantity) {
        const updatedProduct = await ProductRepository.updateProductStock(id, quantity);
        
        if (!updatedProduct) {
            throw new BadRequestError(`No hay suficiente stock para el producto con ID ${id}.`);
        }

        return new ProductDTO(updatedProduct);
    }
}

export default new ProductService();
