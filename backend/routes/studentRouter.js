const express = require('express');
const bodyParser = require('body-parser');
const Student = require('../models/student.model');

const studentRouter = express.Router();

studentRouter.use(bodyParser.json());

studentRouter.post('/signup', (req, res, next) => {
    Student.findOne({ username: req.body.username })
        .then((student) => {
            if (student != null) {
                var err = new Error('Student ' + req.body.username + ' already exists!');
                err.status = 403;
                next(err);
            }
            else {
                return Student.create({
                    username: req.body.username,
                    password: req.body.password
                });
            }
        })
        .then((student) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: 'Registration Successful!', student: student });
        }, (err) => next(err))
        .catch((err) => next(err));
});

studentRouter.post('/login', (req, res, next) => {

    if (!req.session.student) {
        var authHeader = req.headers.authorization;

        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }

        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];

        Student.findOne({ username: username })
            .then((student) => {
                if (student === null) {
                    var err = new Error('Student ' + username + ' does not exist!');
                    err.status = 403;
                    return next(err);
                }
                else if (student.password !== password) {
                    var err = new Error('Your password is incorrect!');
                    err.status = 403;
                    return next(err);
                }
                else if (student.username === username && student.password === password) {
                    req.session.student = 'Student authenticated';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('You are authenticated!')
                }
            })
            .catch((err) => next(err));
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already authenticated!');
    }
})

studentRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

module.exports = studentRouter;