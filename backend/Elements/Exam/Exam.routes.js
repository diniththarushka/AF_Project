const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const AuthorizationExamCandidate = require('../../Auth/Exam.auth.middleware');

const Exam = require('./Exam.model');

router.get('/',AuthorizationExamCandidate,(req,res)=>{
    Exam.find().then((exams)=>{
        res.status(200).json(exams);
    }).catch((err)=>{
        res.status(500).send('Exam fetching failed. Error: ' + err);
    })
});

router.get('/:id',AuthorizationExamCandidate,(req,res)=>{
    let id=req.params.id;
    Exam.findById(id).then((exams)=>{
        res.status(200).json(exams);
    }).catch((err)=>{
        res.status(500).send('Exam fetching failed. Error: ' + err);
    })
});

router.post('/auth',(req,res)=>{
   let Data = req.body;

   Exam.findOne({EnrollmentKey:Data.EnrollmentKey}).then((Exam)=>{
       const payload = {
           Type:'ExamCandidate'
       };
       const token = jwt.sign(payload,'university',{expiresIn: '3h'});
       res.cookie('token',token);
       res.status(200).json(Exam);
   })
});

router.get('/byModule/:name',(req,res)=>{           //secured
    let name=req.params.name;
    Exam.find({Module:name}).then((exams)=>{
        if(exams.length>0){
            let SecuredExamData=[];

            exams.forEach((exam)=>{
                let examData={
                    _id : exam._id,
                    Name: exam.Name,
                    Duration: exam.Duration,
                    EnrollmentKey:exam.EnrollmentKey,
                    Module: exam.Module,
                    AutoGrade: exam.AutoGrade,
                    Questions:exam.QuestionBank.length,
                    Completed:false
                };
                SecuredExamData.push(examData);
                if(SecuredExamData.length === exams.length){
                    res.status(200).json(SecuredExamData);
                }
            });
        }else
            res.status(500).send('Exam fetching failed.');
    }).catch((err)=>{
        res.status(500).send('Exam fetching failed. Error: ' + err);
    })
});

router.post('/',AuthorizationExamCandidate,(req,res)=>{
    let reqObj = req.body;

    let ExamObj = new Exam({
        Name: reqObj.Name,
        Duration: reqObj.Duration,
        EnrollmentKey:reqObj.EnrollmentKey,
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

router.put('/updateStatus/:id',AuthorizationExamCandidate,(req,res)=>{
    let id = req.params.id;
    let reqObj = req.body;
    Exam.findByIdAndUpdate(id,{Completed:reqObj.Completed}).then((exam)=>{
        res.status(200).send('Exam: '+exam.Name+', is marked as completed');
    }).catch((err)=>{
        res.status(500).send('Error while updating Status: '+err);
    })
});
module.exports = router;