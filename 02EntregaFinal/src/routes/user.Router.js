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
); 

router.get('/github',
     passport.authenticate('github', {scope: ['user:email']}), 
     (req, res) => {
    res.send({
        status: 'success',
        message: 'Success'
    });
});

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/home');
    }
);

export default router;