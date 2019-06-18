const mongoose = require('../../_Database/dbconfig');
const Assignment = require('../../Elements/Assignment/Assignment.model');
const ModuleSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    EnrollmentKey: {
        type: String,
        required: true
    },
    Year: {
        type: Number,
        required: true
    },
    Semester: {
        type: Number,
        required: true
    },
    Faculty: {
        type: String,
        required: true
    },
    Assignments:{
        type: [mongoose.Schema.Types.ObjectId] ,
        ref: Assignment
    },
    Instructors:{
        type: [mongoose.Schema.Types.ObjectId]
    },
    Participants: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Module',ModuleSchema);