import mongoose from 'mongoose'

const connectDb = async() =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/linkshortner`);
        console.log(`MONGODB Connected Successfully!! DB Host:${connectionInstance.connection.host}`);
    } catch(error){
        console.log("MONGODB Connection Error", error);
        process.exit(1);
    }
}

export default connectDb;