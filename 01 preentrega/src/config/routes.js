import productsRouter from '../routes/products.router.js';
import cartsRouter from '../routes/carts.router.js';
import viewsRouter from '../routes/views.router.js';

const setupRoutes = (app) => {
    app.use("/", viewsRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);
};

export default setupRoutes;