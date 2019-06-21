const mongoose = require('../../_Database/dbconfig');

const AssignmentSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String
    },
    Module: {
        type: String,
        required: true
    },
    DueDate: {
        type: Date
    },
    Submissions: [{
        Student:{
            type: String
        },
        SubmissionLink:{
            type:String
        },
        Marks:{
            type:Number
        }
    }],

});

module.exports = mongoose.model('Assignment', AssignmentSchema);