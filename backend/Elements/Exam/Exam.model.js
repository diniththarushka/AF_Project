const mongoose = require('../../_Database/dbconfig');

const ExamSchema = mongoose.Schema({
    Name:{
        type: String,
        required:true
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
});

module.exports = mongoose.model('Exam',ExamSchema);