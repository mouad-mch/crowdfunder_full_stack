import mongoose from "mongoose";
import {ENV} from "../../env.js";

const DATABASE_URL = ENV.DATABASE_URL

export const connectDB = async () => {
    try {

        const conn  = await mongoose.connect(DATABASE_URL);
        console.log(`DATABASE connected successfully: ${conn.connection.host}`)

    }catch(err) {
        console.error("DATABASE not connect", err)
    }
}