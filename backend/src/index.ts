import express from "express";

const app = express();

app.get("/", (_, res) => {
    res.json("Server is running at 3000");
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
