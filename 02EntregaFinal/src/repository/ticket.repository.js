import TicketDAO from "../dao/ticketManagerDB.js";

class TicketRepository {
    async createTicket(data) {
        return await TicketDAO.createTicket(data);
    }
}

export default new TicketRepository();
