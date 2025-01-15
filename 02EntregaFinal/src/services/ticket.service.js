import Ticket from '../dao/models/TicketModel.js';

class TicketService {
    
    async createTicket(amount) {
        try {
            const ticket = new Ticket({                
                amount,
            });
            const savedTicket = await ticket.save();
            return savedTicket;
        } catch (error) {
            console.error('Error al crear el ticket:', error);
            throw new Error('No se pudo crear el ticket de compra.');
        }
    }

    async getAllTickets() {
        return await Ticket.find();
    }

    async getTicketById(id) {
        return await Ticket.findById(id);
    }  
}

export default new TicketService();