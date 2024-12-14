import {cartModel} from "./models/CartModel.js";

export class CartManagerDB {
    async getAllCarts() {
        try {
            return await cartModel.find().lean();
        } catch (error) {
            console.error(error.message);
            throw new Error("Error al buscar carts");
        }
    }

    async getCartById(id) {
        try {
            return await cartModel
                .findOne({_id: id})
                .populate({
                    path: "products.product", model: "products",
                })
                .lean();
        } catch (error) {
            console.error(error.message);
            throw new error("Error al obtener el carrito");
        }
    }

    async addCart(products) {
        try {
            const addCart = await cartModel.create({products});
            return addCart;
        } catch (error) {
            console.error(error.message);
            throw new Error(`Error al crear el carrito: ${error}`);
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await cartModel.findOne({_id: cartId});
            if (!cart) {
                throw new Error(`El carrito ${cartId} no existe`);
            }
            const existingProduct = await cartModel.findOne({"products.product": productId})
            if (existingProduct) {
                await cartModel.updateOne({"products.product": productId}, {$inc: {"products.$.quantity": quantity++}})
            } else {
                await cartModel.updateOne({_id: cartId}, {products: [{product: productId, quantity: quantity}]})
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProductInCart(cid, pid) {
        try {
            const cart = await cartModel.findOneAndUpdate({_id: cid}, {$pull: {products: {_id: pid}}}, {new: true});
            return cart;
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw error;
        }
    }

    async updateCart(cid, products) {
        try {
            const cart = await cartModel.findOneAndUpdate({_id: cid}, {products});
            return cart;
        } catch (error) {
            console.error(error.message);
            throw new Error("Error al actualizar los productos del carrito");
        }
    }

    async updateProductQuantity(cid, productId, quantity) {
        try {
            const cart = await cartModel.findOneAndUpdate({
                _id: cid, "products._id": productId
            }, {$set: {"products.$.quantity": quantity}}, {new: true});
            if (!cart) {
                throw new Error("Carrito no encontrado o el producto no está en el carrito");
            }
            return cart;
        } catch (error) {
            console.error(error.message);
            throw new Error("Error al actualizar la cantidad del producto");
        }
    }

    async clearCart(cid) {
        try {
            const cart = await cartModel.findOne({_id: cid});

            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            cart.products = [];
            await cart.save();

            return cart;
        } catch (error) {
            console.error(error.message);
            throw new Error("Error al vaciar carrito");
        }
    }
}