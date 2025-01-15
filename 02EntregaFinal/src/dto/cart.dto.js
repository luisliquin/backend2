class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products
            .map(p => ({
                productId: p.product._id,
                name: p.product.name,
                price: p.product.price,
                quantity: p.quantity,
        }));
    }
}

export default CartDTO;