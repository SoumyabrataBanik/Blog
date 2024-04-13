import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./db/connectDB";

dotenv.config({
    path: "./.env",
});

// Connection to MongoDB
connectDB();

// App
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (_, res) => {
    res.json(`Server running at ${port}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
