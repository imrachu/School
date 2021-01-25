const express = require('express');
const bodyParser = require('body-parser');

const Student = require('../models/student.model');

const attendenceRouter = express.Router();

attendenceRouter.use(bodyParser.json());

attendenceRouter.route('/')
.get((req,res,next) => {
    Student.find({})
    .then((student) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => next(err))
    .catch((err) => next(err));
})

attendenceRouter.route('/:studentId')
.put((req, res, next) => {
    Student.findByIdAndUpdate(req.params.studentId, {
        $set: req.body
    }, { new: true })
    .then((student) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = attendenceRouter;