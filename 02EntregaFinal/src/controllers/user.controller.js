import UserService from '../services/user.service.js';

export const registerUser = async (req, res) => {
    try {
        const user = await UserService.registerUser(req.body);
        console.log(`Usuario registrado: ${user.email}`); 
        res.redirect("/login");
    } catch (error) {
        console.error(error.message);
        res.redirect("/register");
    }
};

export const loginUser = async (req, res) => {
    try {
        req.session.failLogin = false;
        const user = await UserService.loginUser(req.body.email, req.body.password);
        const token = UserService.generateToken(user);

        res.cookie('token', token, { httpOnly: true });
        res.redirect("/home");
    } catch (error) {
        console.error("Error en el proceso de login", error);
        req.session.failLogin = true;
        res.redirect("/login");
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};

export const getCurrentUser = async (req, res) => {
    try {
        const userDTO = await UserService.getCurrentUser(req.user._id);
        res.json({ user: userDTO });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};