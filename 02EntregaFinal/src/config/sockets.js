import {Server} from "socket.io";
import {ProductManagerDB} from "../dao/ProductManagerDB.js";
import {MessageManagerDB} from '../dao/MessageManagerDB.js';

const setupSockets = (server) => {
    const io = new Server(server);

    const products = new ProductManagerDB();
    const messages = new MessageManagerDB()

    io.on("connection", async (socket) => {
        console.log("Cliente conectado: ", socket.id);

        const productList = await products.getAll();
        socket.emit("productList", productList);

        socket.on("addMessage", async messageData => {
            await messages.addMessage(messageData.user, messageData.message)
        })

        socket.on("getMessages", async () => {
            const message = await messages.getMessages()
            socket.emit("receiveMessages", message)
        })

        socket.on("userConnect", data => {
            socket.emit("messageLogs", messages);
            socket.broadcast.emit("newUser", data);
        })
    });
};

export default setupSockets;