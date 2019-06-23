const mongoose = require('../../_Database/dbconfig');

const StudentSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    studentId : {
        type : String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    Modules:[mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Students', StudentSchema);