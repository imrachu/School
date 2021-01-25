const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
var session = require('express-session');
var FileStore = require('session-file-store')(session);

// const indexRouter = require('./routes/index')
const studentRouter = require('./routes/studentRouter');
const teacherRouter = require('./routes/teacherRouter');
const attendenceRouter = require('./routes/attendenceRouter');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const uri = 'mongodb+srv://bidhayak:bidhayak@cluster0.lsfgf.mongodb.net/school?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
    app.listen(PORT);

}).catch(err => console.log(err))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.get("/", (req, res) => {
    res.json({ message: "hello World" });
});

app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);

function auth(req, res, next) {
    console.log(req.session);

    if (!req.session.student && !req.session.teacher) {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        return next(err);
    }
    else {
        if (req.session.student === 'Student authenticated') {
            res.send("Welcome Student")
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 403;
            return next(err);
        }
    }
}
app.use(auth);

function isTeacher() {
    return (req, res, next) => {
        if (req.session.teacher !== 'Teacher authenticated') {
            var err = new Error('You are not authenticated!');
            err.status = 403;
            return next(err);
        }
        else {
            res.send('welcome Teacher');
            next();
        }
    }
}

app.use(isTeacher);

app.use('/attendence', attendenceRouter);

