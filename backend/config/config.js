const mongoose = require('mongoose');
 
// connectDB function

const connectDb = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected to ${conn.connection.host}`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

//export 
module.exports = connectDb;