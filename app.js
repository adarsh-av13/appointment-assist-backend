const express = require('express');
const session = require('express-session');
const connection = require('./config/databaseConfig');
const authRouter = require('./routes/authRoute');
const passport = require('./config/passportConfig');
const app = express();
require('dotenv').config();
const MongoStore = require('connect-mongo')(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 2 * 60 * 1000,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
// app.use('/', indexRouter);

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});