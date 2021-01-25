const express = require('express');
const bodyParser = require('body-parser');
const Teacher = require('../models/teacher.model');

const teacherRouter = express.Router();

teacherRouter.use(bodyParser.json());

teacherRouter.post('/signup', (req, res, next) => {
    Teacher.findOne({ username: req.body.username })
        .then((teacher) => {
            if (teacher != null) {
                var err = new Error('Teacher ' + req.body.username + ' already exists!');
                err.status = 403;
                next(err);
            }
            else {
                return Teacher.create({
                    username: req.body.username,
                    password: req.body.password
                });
            }
        })
        .then((teacher) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: 'Registration Successful!', teacher: teacher });
        }, (err) => next(err))
        .catch((err) => next(err));
});

teacherRouter.post('/login', (req, res, next) => {

    if (!req.session.teacher) {
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

        Teacher.findOne({ username: username })
            .then((teacher) => {
                if (teacher === null) {
                    var err = new Error('Teacher ' + username + ' does not exist!');
                    err.status = 403;
                    return next(err);
                }
                else if (teacher.password !== password) {
                    var err = new Error('Your password is incorrect!');
                    err.status = 403;
                    return next(err);
                }
                else if (teacher.username === username && teacher.password === password) {
                    req.session.teacher = 'Teacher authenticated';
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

teacherRouter.get('/logout', (req, res) => {
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

module.exports = teacherRouter;