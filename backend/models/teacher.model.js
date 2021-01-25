const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    teacher:   {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
const Teacher = mongoose.model('Teacher', teacherSchema)
module.exports = Teacher;