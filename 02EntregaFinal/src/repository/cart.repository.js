import CartDAO from "../dao/CartManagerDB.js";

class CartRepository {
    async getAllCarts() {
        return await CartDAO.getAllCarts();
    }

    async getCartById(id) {
        return await CartDAO.getCartById(id);
    }

    async createCart(products) {
        return await CartDAO.createCart(products);
    }

    async updateCart(cid, products) {
        return await CartDAO.updateCart(cid, products);
    }

    async addProductToCart(cartId, productId, quantity) {
        return await CartDAO.addProductToCart(cartId, productId, quantity);
    }

    async deleteProductInCart(cid, pid) {
        return await CartDAO.deleteProductInCart(cid, pid);
    }

    async clearCart(cid) {
        return await CartDAO.clearCart(cid);
    }

    async updateProductQuantity(cid, productId, quantity) {
        return await CartDAO.updateProductQuantity(cid, productId, quantity);
    }
}

export default new CartRepository();
