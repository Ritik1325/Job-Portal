import mongoose from 'mongoose';


const connect = async () => {
    try {
       await  mongoose.connect(process.env.MONGO_URI,{})
        console.log("connected to the database");

    } catch (error) {
        console.log('Error connecting database',error.message);
        process.exit(1);
       
        
    

    }
}



export default connect;