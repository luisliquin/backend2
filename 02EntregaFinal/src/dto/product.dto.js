class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.category = product.category;
        this.status = product.status;
    }
}

export default ProductDTO;
