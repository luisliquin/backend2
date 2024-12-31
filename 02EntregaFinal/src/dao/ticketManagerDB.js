import TicketModel from "./models/TicketModel.js";

class TicketDAO {
    async createTicket(data) {
        return await TicketModel.create(data);
    }
}

export default new TicketDAO();
