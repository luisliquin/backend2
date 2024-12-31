import ProductService from '../services/product.service.js';

export const getProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts(req.query);
        res.status(200).send(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await ProductService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await ProductService.deleteProduct(req.params.id);
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
