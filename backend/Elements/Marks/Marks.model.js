const mongoose = require('../../_Database/dbconfig');

const MarksSchema = mongoose.Schema({
    ExamName:{
        type: String,
        required:true
    },
    Module:{
        type:String,
        required:true
    },
    StudentName:{
        type:String,
        required:true
    },
    StudentID:{
        type:String,
        required:true
    },
    ExamID:{
        type: String,
    },
    Marks:{
        type:Number
    }
});

module.exports = mongoose.model('Marks',MarksSchema);