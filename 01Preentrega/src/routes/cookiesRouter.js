import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/setCookies", (req, res) => {
    res.cookie(
        "cookie",
        "cookie de prueba"
    )
});

export default cookiesRouter;