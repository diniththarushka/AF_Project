const express = require('express');
const router = express.Router();

const Exam = require('./Exam.model');

router.get('/',(req,res)=>{
    Exam.find().then((exams)=>{
        res.status(200).json(exams);
    }).catch((err)=>{
        res.status(500).send('Exam fetching failed. Error: ' + err);
    })
});

router.post('/',(req,res)=>{
    let reqObj = req.body;

    let ExamObj = new Exam({
        Name: reqObj.Name,
        Duration: reqObj.Duration,
        Module: reqObj.Module,
        AutoGrade: reqObj.AutoGrade,
        QuestionBank: reqObj.QuestionBank
    });

    ExamObj.save().then(()=>{
        res.status(200).send('Exam successfully added')
    }).catch((err)=>{
        res.status(500).send('Error fetching exams. Error: '+err);
    })
});

module.exports = router;