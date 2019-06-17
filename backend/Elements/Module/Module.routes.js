const express = require('express');
const router = express.Router();

const Module = require('./Module.model');

router.get('/', (req, res) => {
    Module.find().then((modules) => {
        if (modules.length === 0) {
            res.status(200).send('No data in database');
        } else {
            res.status(200).send(modules);
        }
    })
});

router.post('/', (req, res) => {
    let reqBody = req.body;
    let ModuleObj = new Module({
        Name: reqBody.Name,
        EnrollmentKey: reqBody.EnrollmentKey,
        Year: reqBody.Year,
        Semester: reqBody.Semester,
        Faculty: reqBody.Faculty,
    });
    ModuleObj.save().then(() => {
        res.status(200).send('Module added successfully');
    }).catch((err) => {
        res.status(500).send('Module adding failed. Error: ' + err);
    })
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let reqBody = req.body;

    let ModuleObj = {
        Name: reqBody.Name,
        EnrollmentKey: reqBody.EnrollmentKey,
        Year: reqBody.Year,
        Semester: reqBody.Semester,
        Faculty: reqBody.Faculty,
    };

    Module.findByIdAndUpdate(id, ModuleObj).then(() => {
        res.status(200).send('Module updated successfully');
    }).catch((err) => {
        res.status(500).send('Module updating failed. Error: ' + err);
    })
});

router.delete('/:id',(req,res)=>{
    Module.findByIdAndDelete(id).then(()=>{
        res.status(200).send('Module deleted successfully');
    }).catch((err)=>{
        res.status(500).send('Module deletion failed. Error: '+err);
    })
});
module.exports = router;