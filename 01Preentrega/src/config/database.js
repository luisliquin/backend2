import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://luisliquin:5VdRQt7U9jhvswU4@cluster0.e7prtgh.mongodb.net/?retryWrites=true&w=majority", {dbName: "ecommerce"})
        console.log("conectado a la bbdd en mongo")
    } catch (error) {
        console.log("Fallo de conexion a la bbdd");
    }
};

export default connectToDatabase;