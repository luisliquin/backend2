import { Router } from "express";
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", deleteProduct);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);

export default productRouter;