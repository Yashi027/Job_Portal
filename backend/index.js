import './utils/instrument.js'
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
dotenv.config({});
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';


app.get("/",(req,res) => {
    return res.status(200).json({
        success: true,
        message: "Backend running"
    })
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use("/webhooks", express.raw({ type: "application/json" }));
app.post("/webhooks",clerkWebhooks)
app.use('/api/company',companyRoutes)

await connectDB()


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


const PORT=process.env.PORT || 3000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
