const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
        default: false
    },
    attendence:{
        type: Boolean,
        default: false
    }

}, { timestamps: true });
const Student = mongoose.model('Student', studentSchema)
module.exports = Student;