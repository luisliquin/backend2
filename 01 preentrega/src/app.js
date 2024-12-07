import express from "express";
import __dirname from "./utils/utils.js";
import setupRoutes from "./config/routes.js";
import setupHandlebars from "./config/handlebars.js";
import setupSockets from "./config/sockets.js";
import connectToDatabase from "./config/database.js";
import {notFoundHandler, errorHandler} from "./config/errorHandlers.js";
import {config} from "dotenv";
import {MessageManagerDB} from "./dao/MessageManagerDB.js";
import initializatePassport from "./config/passport.js";

config();

const port = 3000;
const app = express();

app.use(express.static(`${__dirname}/../public`));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

setupHandlebars(app);
setupRoutes(app);
connectToDatabase();
initializatePassport();

const server = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

setupSockets(server);

app.use(notFoundHandler);
app.use(errorHandler);

const messagesManagerService = new MessageManagerDB()

app.get('/chat', async (req, res) => {
    const chat = await messagesManagerService.getMessages({})
    res.render("chat", {
        style: 'index.css', layout: 'main', chat: chat
    })
})