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

let origin;
if (process.env.NODE_ENV === 'production')
    origin = 'https://appointment-assist.netlify.app';
else
    origin = 'http://localhost:8081';

app.use(cors({
    origin: origin,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.options('*', cors());
app.use('/', authRouter);
app.use('/consultants', consultantRouter);
app.use('/appointments', appointmentRouter);

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running`);
});