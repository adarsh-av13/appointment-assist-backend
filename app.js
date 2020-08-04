const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./config/databaseConfig');
const authRouter = require('./routes/authRoute');
const consultantRouter = require('./routes/consultantRoute');
const appointmentRouter = require('./routes/appointmentRoute');
const passport = require('./config/passportConfig');

const app = express();

require('dotenv').config();

app.use(cors({
    origin: ['http://localhost:8082', 'http://localhost:8081']
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/', authRouter);
app.use('/consultants', consultantRouter);
app.use('/appointments', appointmentRouter);

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:3000`);
});