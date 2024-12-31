import { CartManagerDB } from "../dao/CartManagerDB.js";
import { ProductManagerDB } from "../dao/ProductManagerDB.js";

const carts = new CartManagerDB();
const products = new ProductManagerDB();

export const getAllCarts = async (req, res) => {
    try {
        const result = await carts.getAllCarts();
        return res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await carts.getCartById(cid);
        res.send({
            status: "success",
            payload: cart,
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message,
        });
    }
};

export const addCart = async (req, res) => {
    try {
        const { products } = req.body;
        const newCart = await carts.addCart(products);
        res.send({
            status: "success",
            payload: newCart,
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message,
        });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        const productDetails = await products.getProductByID(pid);

        if (!productDetails) {
            return res.status(400).send({
                status: "error",
                message: "Producto no encontrado",
            });
        }

        const updateCart = await carts.addProductToCart(cid, productDetails);
        res.send({
            status: "success",
            payload: updateCart,
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message,
        });
    }
};

export const deleteProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await carts.deleteProductInCart(cid, pid);
        if (!cart) {
            return res.status(400).send({
                status: "error",
                message: "No se encontró el producto en el carrito.",
            });
        }
        return res.send({
            status: "success",
            message: `ID del producto eliminado: ${pid}`,
            cart,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            status: "error",
            message: error.message,
        });
    }
};

export const updateCart = async (req, res) => {
    try {
        const result = await carts.updateCart(req.params.cid, req.body.products);
        res.send({
            status: "success",
            message: "Carrito actualizado correctamente",
            payload: result,
        });
    } catch (error) {
        res.status(400).send({
            status: "error",
            message: error.message,
        });
    }
};

export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        let { quantity } = req.body;
        quantity = parseInt(quantity);
        const result = await carts.updateProductQuantity(cid, pid, quantity);
        res.send({
            status: "success",
            cart: result,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            status: "error",
            message: error.message,
        });
    }
};

export const clearCart = async (req, res) => {
    const cartId = req.params.cid;
    try {
        await carts.clearCart(cartId);
        res.send("Carrito eliminado");
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: error.message,
        });
    }
};
