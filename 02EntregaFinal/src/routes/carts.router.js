import { Router } from "express";
import {
    getAllCarts,
    getCartById,
    addCart,
    addProductToCart,
    deleteProductInCart,
    updateCart,
    updateProductQuantity,
    clearCart,
} from "../controllers/cart.controller.js";

const cartsRouter = Router();

cartsRouter.get("/", getAllCarts);
cartsRouter.get("/:cid", getCartById);
cartsRouter.post("/", addCart);
cartsRouter.post("/:cid/product/:pid", addProductToCart);
cartsRouter.delete("/:cid/product/:pid", deleteProductInCart);
cartsRouter.put("/:cid", updateCart);
cartsRouter.put("/:cid/product/:pid", updateProductQuantity);
cartsRouter.delete("/:cid", clearCart);

export default cartsRouter;
