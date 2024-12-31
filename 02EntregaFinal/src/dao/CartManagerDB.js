import { cartModel } from "./models/CartModel.js";

class CartDAO {
    async getAllCarts() {
        return await cartModel.find().lean();
    }

    async getCartById(id) {
        return await cartModel.findOne({ _id: id }).populate("products.product").lean();
    }

    async createCart(products) {
        return await cartModel.create({ products });
    }

    async updateCart(cid, products) {
        return await cartModel.findOneAndUpdate({ _id: cid }, { products }, { new: true });
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await cartModel.findOne({ _id: cartId });
        if (!cart) throw new Error(`El carrito ${cartId} no existe`);

        const existingProduct = cart.products.find(p => p.product.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return cart;
    }

    async deleteProductInCart(cid, pid) {
        return await cartModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { product: pid } } },
            { new: true }
        );
    }


    async updateProductQuantity(cid, productId, quantity) {
        const cart = await cartModel.findOneAndUpdate(
            { _id: cid, "products.product": productId },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );

        if (!cart) throw new Error("Carrito no encontrado o producto no existe en el carrito");
        return cart;
    }

    async clearCart(cid) {
        return await cartModel.findOneAndUpdate({ _id: cid }, { products: [] }, { new: true });
    }
}

export default new CartDAO();
