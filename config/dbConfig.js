const mongoose = require('mongoose');


const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);

        if(conn) {
            console.log('connection to mongoDB successful...');
        }
        
    } catch (error) {
        
        console.log(error);

    }

};


module.exports = {
    connectDB
};