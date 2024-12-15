import bcrypt from "bcrypt";

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    if (!user?.password || !password) {
        throw new Error('Invalid arguments for password comparison');
    }
    return bcrypt.compareSync(password, user.password);
}

export const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).send("Acceso denegado. Solo para administradores.");
    }
}