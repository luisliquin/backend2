import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT, {dbName: process.env.DBNAME})
        console.log("conectado a la bbdd en mongo")
    } catch (error) {
        console.log("Fallo de conexion a la bbdd");
    }
};

export default connectToDatabase;