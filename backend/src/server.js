import { app } from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from '../env.js';

const PORT = ENV.PROT || 1010

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`)
        })

    }catch(error) {
        console.error(error)
    }
}

startServer()
