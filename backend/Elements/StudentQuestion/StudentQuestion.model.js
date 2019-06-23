const mongoose = require('../../_Database/dbconfig');

const StudentQuestion = new mongoose.Schema({
    itNumber: {
        type: String,
        required: true
    },
    module: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('StudentQuestion', StudentQuestion);