import CartRepository from "../repository/cart.repository.js";
import CartDTO from "../dto/cart.dto.js";
import ProductService from "./product.service.js";
import TicketService from "./ticket.service.js";

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
  
    async processPurchase(cart) {
        const processedProducts = [];
        const failedProducts = [];
        let totalAmount = 0;

        for (const item of cart.products) {
            try {
                const product = await ProductService.getProductById(item.productId);
                
                if (!product) {
                    throw new Error("Producto no encontrado");
                }

                await ProductService.updateProductStock(product.id, item.quantity);
 
                processedProducts.push({
                    productId: product.id,
                    name: product.title, 
                    quantity: item.quantity,
                });

                totalAmount += product.price * item.quantity;
            } catch (error) {
                console.error(`Error al procesar el producto con ID ${item.productId}: ${error.message}`);

                let availableStock = 0;
                try {
                    const product = await ProductService.getProductById(item.productId);
                    if (product) {
                        availableStock = product.stock;
                    }
                } catch (err) {
                }

                failedProducts.push({
                    productId: item.productId,
                    name: item.name || "Producto desconocido", 
                    requested: item.quantity,
                    available: availableStock,
                });
            }
        }

        if (failedProducts.length > 0) {
            await this.updateCart(cart._id, failedProducts.map(f => ({
                product: f.productId,
                quantity: f.requested - (f.available || 0),
            })));
        }else{
            await this.clearCart(cart._id);
        }

        let ticket = null;
        if (processedProducts.length > 0) {
            try {
                ticket = await TicketService.createTicket(totalAmount);
            } catch (ticketError) {
                console.error('Error al crear el ticket:', ticketError.message);         
            }
        }

        return { processedProducts, failedProducts, totalAmount, ticket };
    }
}

export default new CartService();