const mongoose = require('../../_Database/dbconfig');

const SubmissionSchema = mongoose.Schema({
    Student:{
        type:String
    },
    SubmissionLink:{
        type:String
    },
    Marks:{
        type:Number
    }
});

module.exports = mongoose.model('Submission',SubmissionSchema);