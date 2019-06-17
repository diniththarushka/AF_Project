const mongoose = require('../../_Database/dbconfig');

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
        type: String,
        required: true
    },
    Semester: {
        type: String,
        required: true
    },
    Faculty: {
        type: String,
        required: true
    },
    Assignments:{
        type: [mongoose.Schema.Types.ObjectId]
    },
    Participants: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Module',ModuleSchema);