import express from 'express';
import cors from 'cors';
import connectDB from './Config/db.js';
import taskRoutes from './Routes/task.route.js';  // Use ES6 import
import dotenv from 'dotenv';
dotenv.config();


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
