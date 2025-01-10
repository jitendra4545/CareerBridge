
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connection = require('./config/db');
const AdminRouter = require('./routes/adminRoute');
const AspirantRouter = require('./routes/aspirantRoute');
const adminAuthMiddleware = require('./middleware/adminAuthMiddleware');
const JobRouter = require('./routes/jobRoute');
const app = express();
app.use(cors())
app.use(express.json());
app.use("/admin", AdminRouter);
app.use("/aspirants", AspirantRouter);
app.use('/jobs',JobRouter)


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
