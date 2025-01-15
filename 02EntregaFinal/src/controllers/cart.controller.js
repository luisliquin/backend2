import CartService from "../services/cart.service.js";
import TicketService from "../services/ticket.service.js";

export const getAllCarts = async (req, res) => {
    try {
        const carts = await CartService.getAllCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cart = await CartService.getCartById(req.params.cid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const createCart = async (req, res) => {
    try {
        const cart = await CartService.createCart(req.body.products);
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await CartService.addProductToCart(cid, pid, req.body.quantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await CartService.deleteProductInCart(cid, pid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await CartService.clearCart(req.params.cid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const result = await CartService.updateCart(req.params.cid, req.body.products);
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

        const result = await CartService.updateProductQuantity(cid, pid, quantity);

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

export const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await CartService.getCartById(cid);
        const { processedProducts, failedProducts, totalAmount } = await CartService.processPurchase(cart);
        print (`${processedProducts} ${failedProducts} ${totalAmount}`)
        const ticket = await TicketService.createTicket({
            code: `TICKET-${Date.now()}`,
            amount: totalAmount,
            purchaser: req.user.email, 
        });

        res.status(200).json({
            status: "success",
            ticket,
            processedProducts,
            failedProducts,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};