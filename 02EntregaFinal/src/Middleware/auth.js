export const auth = function (req, res, next) {
    console.log("Session:", req.session);  
    if (!req.session?.user) {
        console.log("No se encontro un usuario en la sesion, se redigira al login");
        return res.redirect("/login");
    }
    return next();
}
