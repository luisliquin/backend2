import mongoose from 'mongoose';

const ticketCollection = 'tickets';

const ticketSchema = mongoose.Schema({
    code: { 
        type: String, unique: true, required: true 
    }, purchase_datetime: { 
        type: Date, default: Date.now 
    },
    amount: { 
        type: Number, required: true 
    }, purchaser: { 
        type: String, required: true 
    },
});

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;