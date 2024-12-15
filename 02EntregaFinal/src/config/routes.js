import productsRouter from '../routes/products.router.js';
import cartsRouter from '../routes/carts.router.js';
import viewsRouter from '../routes/views.router.js';
import coockieParser from "cookie-parser"
import cookiesRouter from "../routes/cookiesRouter.js";
import session from 'express-session';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import userRouter from '../routes/user.Router.js';
import passport from 'passport';
import '../config/passport.js';

const setupRoutes = (app) => {
    const uri = process.env.MONGO_CONNECT;
    
    const options = {dbName: "ecommerce"};
    mongoose.connect(uri, options);

    app.use(session(
        {
            store: mongoStore.create(
                {
                    mongoUrl: uri,
                    ttl: 1200
                }
            ),
            secret: 'secretPhrase',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }
        }
    ))

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(coockieParser("CoderPass2024"));

    app.use("/", viewsRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);
    app.use("/cookies", cookiesRouter);
    app.use("/api/sessions", userRouter);
};

export default setupRoutes;