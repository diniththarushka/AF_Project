const express = require('express');
const router = express.Router();
const Marks = require('./Marks.model');

const AuthorizationAdminInstructor = require('../../Auth/AdminInstructor.auth.middleware');
const AuthorzationExamCandidate = require('../../Auth/Exam.auth.middleware');


router.get('/',AuthorizationAdminInstructor, (req, res) => {
    Marks.find().then((marks) => {
        res.status(200).json(marks);
    })
});

router.get('/:id',AuthorizationAdminInstructor, (req, res) => {
    let id = req.params.id;
    Marks.findById(id).then((marks) => {
        res.status(200).json(marks);
    })
});

router.get('/byModule/:name',AuthorizationAdminInstructor, (req, res) => {
    let name = req.params.name;
    Marks.find({Module:name}).then((marks) => {
        res.status(200).json(marks);
    })
});

router.post('/',AuthorzationExamCandidate, (req, res) => {
    let reqBody = req.body;

    let MarksObj = new Marks({
        ExamName: reqBody.ExamName,
        Module: reqBody.Module,
        StudentName: reqBody.StudentName,
        AnswerScript:reqBody.Answers,
        StudentID: reqBody.StudentID,
        ExamID: reqBody.ID,
        Marks: reqBody.Marks
    });

    MarksObj.save().then(() => {
        res.status(200).send('Marks Added');
    }).catch((err) => {
        res.status(500).send('Marks adding failed. Error: ' + err);
    })
});

module.exports = router;
