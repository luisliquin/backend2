import {Router} from "express";
import {ProductManagerDB} from "../dao/ProductManagerDB.js";
import passport from "passport";

const router = Router();
const products = new ProductManagerDB();


router.get("/", async (req, res) => {
    res.render("login", {
        title: "Login", 
        style: "custom.css"
    });
});

router.get("/login", async (req, res) => {
    res.render("login", {
        title: "Login", 
        style: "custom.css"
    });
});

router.get("/home", async (req, res) => {
    try {
        const productList = await products.getAll();
        res.render("home", {
            title: "Home",
            style: "home.css",
            productList
        });
    } catch (error) {
        res.status(500).send({error: "Error interno del servidor"});
    }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const productList = await products.getAll();
        res.render("realtimeproducts", {
            title: "Real Time Products", style: "realtimeproducts.css", productList
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/chat", async (req, res) => {
    res.render("chat", {
        title: "Chat con vendedor", style: "chat.css"
    })
})

router.get("/register", (req, res) => {
    res.render('register', {
        title: 'Register', 
        style: 'custom.css'
    })
});

router.get("/callback", passport.authenticate ("github",  {
    failureRedirect: "/login",
    successRedirect: "/home",
    passReqToCallback: true
}));

export default router;