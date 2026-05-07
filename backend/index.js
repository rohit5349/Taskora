import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from './routes/user.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(cors({
  origin: [
    "https://taskoraapp-git-main-rohits-projects-3e8dba6f.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(cookieParser());
app.use('/backend/user', userRouter);
app.use('/backend/taskRoutes', taskRoutes);

const connect = async () => {
     try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connected to MongoDB");
     } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
     }
};

app.get('/' , (req , res) => {
    res.send("hello guys !")
});

app.listen(PORT , () => {
    connect();
    console.log(`server is running on port ${PORT}`);
});
