import './utils/instrument.js'
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectCloudinary from './utils/cloudinary.js';
import connectDB from './utils/db.js';
dotenv.config({});
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'

const app = express();


app.use(cors())
app.use(cookieParser());


app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use("/webhooks", express.raw({ type: "application/json" }));
app.post("/webhooks",clerkWebhooks)


app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use(clerkMiddleware())
app.use('/api/users',userRoutes)

app.get("/",(req,res) => {
    return res.status(200).json({
        success: true,
        message: "Backend running"
    })
});


await connectDB()
await connectCloudinary()



const PORT=process.env.PORT || 3000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
