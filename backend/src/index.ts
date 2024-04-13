import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./db/connectDB";
import userRouter from "./routes/user.route";

dotenv.config({
    path: "./.env",
});

// Connection to MongoDB
connectDB();

// App
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use("/api/user", userRouter);
