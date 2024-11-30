import handlebars from 'express-handlebars';
import __dirname from '../utils/utils.js';

const setupHandlebars = (app) => {
    app.engine("handlebars", handlebars.engine());
    app.set("views", `${__dirname}/views`);
    app.set("view engine", "handlebars");
};

export default setupHandlebars;