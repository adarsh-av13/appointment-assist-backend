const express = require('express');
const connection = require('./config/database');
const authRouter = require('./routes/auth');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
    app.listen(3000, () => {
        console.log(`Server running at http://localhost:3000`);
    });
});