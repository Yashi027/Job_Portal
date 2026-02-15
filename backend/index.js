import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
dotenv.config({});

app.get("/",(req,res) => {
    return res.status(200).json({
        success: true,
        message: "Backend running"
    })
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

const PORT=process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})
