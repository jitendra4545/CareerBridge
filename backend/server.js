
require('dotenv').config();
const express = require('express');
const connection = require('./config/db');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log('Database connected');
    } catch (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
});
