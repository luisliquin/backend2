import { Router } from "express";
import {
    getAllCarts,
    getCartById,
    createCart,
    addProductToCart,
    deleteProductInCart,
    updateCart,
    updateProductQuantity,
    clearCart,
    purchaseCart
} from "../controllers/cart.controller.js";

const cartsRouter = Router();

cartsRouter.get("/", getAllCarts);
cartsRouter.get("/:cid", getCartById);
cartsRouter.post("/", createCart);
cartsRouter.post("/:cid/product/:pid", addProductToCart);
cartsRouter.delete("/:cid/product/:pid", deleteProductInCart);
cartsRouter.put("/:cid", updateCart);
cartsRouter.put("/:cid/product/:pid", updateProductQuantity);
cartsRouter.delete("/:cid", clearCart);
cartsRouter.post("/:cid/purchase", purchaseCart);

export default cartsRouter;
