import CartRepository from "../repository/cart.repository.js";
import CartDTO from "../dto/cart.dto.js";

class CartService {
    async getAllCarts() {
        const carts = await CartRepository.getAllCarts();
        return carts.map(cart => new CartDTO(cart));
    }

    async getCartById(id) {
        const cart = await CartRepository.getCartById(id);
        if (!cart) throw new Error("Carrito no encontrado");
        return new CartDTO(cart);
    }

    async createCart(products) {
        const cart = await CartRepository.createCart(products);
        return new CartDTO(cart);
    }

    async updateCart(cid, products) {
        const updatedCart = await CartRepository.updateCart(cid, products);
        return new CartDTO(updatedCart);
    }

    async addProductToCart(cartId, productId, quantity) {
        const updatedCart = await CartRepository.addProductToCart(cartId, productId, quantity);
        return new CartDTO(updatedCart);
    }

    async deleteProductInCart(cid, pid) {
        const updatedCart = await CartRepository.deleteProductInCart(cid, pid);
        return new CartDTO(updatedCart);
    }

    async clearCart(cid) {
        const updatedCart = await CartRepository.clearCart(cid);
        return new CartDTO(updatedCart);
    }

    async updateProductQuantity(cid, productId, quantity) {
        const updatedCart = await CartRepository.updateProductQuantity(cid, productId, quantity);
        if (!updatedCart) throw new Error("Carrito no encontrado o producto no existe en el carrito");
        return new CartDTO(updatedCart);
    }
}

export default new CartService();