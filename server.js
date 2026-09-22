const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routers = require('./routes/routes');
const path = require('path');
const { middlewareGlobal, globalErrorHandler, csrfMiddleware, notFoundHandler } = require('./src/middlewares/middleware');

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { dbName: 'AGENDA' })
    .then(() => {
        app.emit('start');
        console.log('MongoDB Connected')
    })
    .catch((err) => console.log(err));

const session = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo.create ? connectMongo : connectMongo.default;
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');

app.set('trust proxy', process.env.NODE_ENV === 'production');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        dbName: 'AGENDA'
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
});

app.use(helmet());
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(csrfMiddleware);
app.use(middlewareGlobal);

app.use(routers);

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.on('start', () => {
    app.listen(3000, () => {
        console.log('Access http://localhost:3000');
        console.log('Server started on port 3000!');
    });
})
