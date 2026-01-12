
import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const connectionInstanse = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected Successfully ! DB Host : ${connectionInstanse.connection.host}`)
    } catch (error) {
        console.error(`Database Connection Failed - Error : ${error}`)
        process.exit(1)
    }
}

