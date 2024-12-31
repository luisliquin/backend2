import { Router } from "express";
import passport from "passport";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser); // Ruta para registrar usuarios
router.post("/login", loginUser);       // Ruta para login
router.get("/logout", logoutUser);     // Ruta para logout
router.get(
    "/current",
    passport.authenticate('jwtCookies', { session: false }),
    getCurrentUser
); // Ruta para obtener el usuario actual

export default router;