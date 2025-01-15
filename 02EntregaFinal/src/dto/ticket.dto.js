class TicketDTO {
    constructor(ticket) {
        if (!ticket) {
            throw new Error("Ticket no proporcionado al DTO");
        }

        this.id = ticket._id;
        this.code = ticket.code;
        this.purchase_datetime = ticket.purchase_datetime;
        this.amount = ticket.amount;
        this.purchaser = ticket.purchaser;
    }
}

export default TicketDTO;