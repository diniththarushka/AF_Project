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
        Completed:false,
        QuestionBank: reqObj.QuestionBank
    });

    ExamObj.save().then(()=>{
        res.status(200).send('Exam successfully added')
    }).catch((err)=>{
        res.status(500).send('Error fetching exams. Error: '+err);
    })
});

router.put('/updateStatus/:id',(req,res)=>{
    let id = req.params.id;
    let reqObj = req.body;
    Exam.findByIdAndUpdate(id,{Completed:reqObj.Completed}).then((exam)=>{
        res.status(200).send('Exam: '+exam.Name+', is marked as completed');
    }).catch((err)=>{
        res.status(500).send('Error while updating Status: '+err);
    })
});
module.exports = router;