import TicketRepository from "../repository/ticket.repository.js";

class TicketService {
    async createTicket(data) {
        return await TicketRepository.createTicket(data);
    }
}

export default new TicketService();
