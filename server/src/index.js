import dns from "node:dns";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const app = express();

const PORT = process.env.PORT || 6767;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes)
app.listen(PORT, () => {
    console.log("server is running on PORT:"+ PORT);
    connectDB();
})