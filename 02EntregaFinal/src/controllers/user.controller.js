import UserModel from '../dao/models/UserModel.js';
import jwt from 'jsonwebtoken';
import { createHash, isValidPassword } from '../utils/functionsUtils.js';

const generateToken = (user) => {
    return jwt.sign({ sub: user._id }, process.env.CLIENT_SECRET, { expiresIn: '1h' });
};

// Controlador para registrar usuarios
export const registerUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) throw new Error("Register error!");
        const newUser = {
            first_name: req.body.first_name ?? "",
            last_name: req.body.last_name ?? "",
            email: req.body.email,
            age: req.body.age ?? "",
            password: createHash(req.body.password),
        };
        await UserModel.create(newUser);
        res.redirect("/login");
    } catch (e) {
        console.error(e.message);
        res.redirect("/register");
    }
};

// Controlador para login
export const loginUser = async (req, res) => {
    try {
        req.session.failLogin = false;
        const user = await UserModel.findOne({ email: req.body.email }).lean();
        if (!user) {
            req.session.failLogin = true;
            return res.redirect("/login");
        }

        if (!isValidPassword(user, req.body.password)) {
            req.session.failLogin = true;
            return res.redirect("/login");
        }

        const token = generateToken(user);

        res.cookie('token', token, { httpOnly: true });
        return res.redirect("/home");
    } catch (e) {
        console.error("Error en el proceso de login", e);
        req.session.failLogin = true;
        return res.redirect("/login");
    }
};

// Controlador para logout
export const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

// Controlador para "current"
export const getCurrentUser = (req, res) => {
    res.json({ user: req.user });
};
