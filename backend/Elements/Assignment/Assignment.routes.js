const express = require('express');
const router = express.Router();

const Assignment = require('./Assignment.model');

router.get('/', (req, res) => {
    Assignment.find().then((assignments) => {
        res.status(200).json(assignments);
    }).catch((err) => {
        res.status(500).send('Assignment fetching failed. Error: ' + err);
    })
});

router.get('/getByName/:name',(req,res)=>{
    let name=req.params.name;

    Assignment.findOne({Name:name}).then((assignments)=>{
        res.status(200).json(assignments);
    }).catch((err)=>{
        res.status(500).send('Error: '+err);
    })
});

router.get('/:id', (req, res) => {
    let id=req.params.id;
    Assignment.findById(id).then((assignments) => {
        res.status(200).json(assignments);
    }).catch((err) => {
        res.status(500).send('Assignment fetching failed. Error: ' + err);
    })
});

router.post('/', (req, res) => {
    let reqObj = req.body;
    let AssignmentObj = new Assignment({
        Name: reqObj.Name,
        Description: reqObj.Description,
        Module: reqObj.Module,
        DueDate: reqObj.DueDate
    });
    AssignmentObj.save().then((data) => {
        res.status(200).json({message: 'Assignment successfully added.',ID:data._id});
    }).catch((err) => {
        res.status(500).send('Assignment adding failed. Error: ' + err);
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let reqObj = req.body;

    let AssignmentObj = {
        Name: reqObj.Name,
        Description: reqObj.Description,
        Module: reqObj.Module,
        DueDate: reqObj.DueDate
    };
    Assignment.findByIdAndUpdate(id, AssignmentObj).then(() => {
        res.status(200).send('Assignment updating successful');
    }).catch((err) => {
        res.status(500).send('Assignment updating failed. Error: ' + err);
    })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Assignment.findByIdAndDelete(id).then(() => {
        res.status(200).send('Assignment deleting successful');
    }).catch((err) => {
        res.status(500).send('Assignment deleting failed. Error: ' + err);
    })
});

router.put('/submit/:id', (req, res) => {
    let id = req.params.id;
    let reqObj = req.body;
    let Submission = {
        'Student': reqObj.StudentID,
        'SubmissionLink': reqObj.Link
    };

    Assignment.findById(id).then((assignment) => {
        let subs = assignment.Submissions;
        subs.push(Submission);

        Assignment.findByIdAndUpdate(id, {Submissions: subs}).then(() => {
            res.status(200).send('Submission data summary: Student: ' + Submission.Student + ", Link: " + Submission.SubmissionLink);
        }).catch((err) => {
            res.status(500).send('Submission data adding failed. Error: ' + err);
        });
    }).catch((err) => {
        res.status(500).send('Assignment fetching failed. Error: ' + err);
    });

});

module.exports = router;