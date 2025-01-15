import productModel from './models/ProductModel.js';

export class ProductManagerDB {
    async getAll() {
        return await productModel.find().lean();
    }

    async getById(id) {
        const product = await productModel.findOne({ _id: id });
        if (!product) throw new Error(`El producto con ID ${id} no existe.`);
        return product;
    }

    async create(product) {
        return await productModel.create(product);
    }

    async update(id, productUpdate) {
        const product = await productModel.findOneAndUpdate({ _id: id }, productUpdate, { new: true });
        if (!product) throw new Error(`Producto con ID ${id} no encontrado.`);
        return product;
    }

    async delete(id) {
        const result = await productModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) throw new Error(`Producto con ID ${id} no encontrado.`);
        return result;
    }

    async paginate(filter, options) {
        return await productModel.paginate(filter, options);
    }

    async updateProductStock(id, quantity) {
        const updatedProduct = await productModel.findOneAndUpdate(
            { _id: id, stock: { $gte: stock } },
            {$inc: { stock: - quantity }},
            { new: true }
        );
        return updatedProduct;
    }
}

export default new ProductManagerDB();
