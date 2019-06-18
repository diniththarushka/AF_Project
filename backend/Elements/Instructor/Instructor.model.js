const mongoose = require('../../_Database/dbconfig');

const InstructorSchema = new mongoose.Schema({

    Name: {
        type: String
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Faculty: {
        type: []
    },
    Modules: []
});

module.exports = mongoose.model('Instructor',InstructorSchema);