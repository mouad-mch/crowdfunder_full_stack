import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";


const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'server is running'
    })
})


app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)


export { app }
export default app
