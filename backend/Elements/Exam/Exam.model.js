const mongoose = require('../../_Database/dbconfig');

const ExamSchema = mongoose.Schema({
    Name:{
        type: String,
        required:true
    },
    EnrollmentKey:{
        type:String,
        required:true
    },
    SubmissionDate:{
        type:Date,
        default:Date.now
    },
    Duration:{
        type: Number,
        required:true
    },
    Module:{
        type: String,
        required:true
    },
    AutoGrade:{
        type: Boolean,
        required:true
    },
    Completed:{
        type:Boolean,
        required:true
    },
    QuestionBank:[{
        Question: String,
        Answers: [],
        CorrectAns:Number
    }]
},{timestamps:true});
ExamSchema.index({createdAt: 1},{expireAfterSeconds:21600});

module.exports = mongoose.model('Exam',ExamSchema);