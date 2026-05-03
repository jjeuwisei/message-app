import dns from "node:dns";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors"
import {app, server} from "./lib/socket.js";
import path from "path";


dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();


const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
        res.sendFile()
    })
}


server.listen(PORT, () => {
    console.log("server is running on PORT:"+ PORT);
    connectDB();
})