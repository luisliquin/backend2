import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4(), 
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Por favor, ingrese un correo electrónico válido.'],
    },
}, { timestamps: false });

export default mongoose.model('Ticket', ticketSchema);