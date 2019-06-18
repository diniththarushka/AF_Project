const express = require('express');
const router = express.Router();

const Module = require('./Module.model');

router.get('/', (req, res) => {
    Module.find().then((modules) => {
        if (modules.length === 0) {
            res.status(500).send('No data in database');
        } else {
            res.status(200).send(modules);
        }
    }).catch((err)=>{
        res.status(500).send('Error: '+err);
    })
});

router.get('/getByName/:name',(req,res)=>{
    let name = req.params.name;

    Module.findOne({Name:name}).then((module)=>{
        res.status(200).json({
            ID:module.id,
            Name:module.Name
        });
    }).catch((err)=>{
        res.status(500).send('Error: '+err);
    })
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Module.findById(id).then((module) => {
        if (module.length === 0) {
            res.status(500).send('No data in database');
        } else {
            res.status(200).send(module);
        }
    }).catch((err)=>{
        res.status(500).send('Error: '+err);
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

    if(reqBody.Year >= 1 && reqBody.Year <= 4){
        if(reqBody.Semester === 1 || reqBody.Semester === 2){
            ModuleObj.save().then(() => {
                res.status(200).send('Module added successfully');
            }).catch((err) => {
                res.status(500).send('Module adding failed. Error: ' + err);
            })
        }else{
            res.status(500).send('Module adding failed. Error: Semester value is invalid');
        }
    }else{
        res.status(500).send('Module adding failed. Error: Year value is invalid');
    }


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

router.put('/addInstructor/:id',(req,res)=>{
    let id = req.params.id;
    let reqBody = req.body;

    Module.findById(id).then((module)=>{
        let InstructorArray = module.Instructors;

        if(InstructorArray.includes(reqBody.Instructors)){
            res.status(500).send('Instructor is already assigned to Module.');
        }else{
            InstructorArray.push(reqBody.Instructors);

            Module.findByIdAndUpdate(id,{Instructors: InstructorArray}).then(()=>{
                res.status(200).send('Instructor added to Module successfully');
            }).catch((err)=>{
                res.status(500).send('Instructor adding failed. Error: '+err);
            })
        }
    }).catch((err)=>{
        res.status(500).send('Module not found. Error: '+err)
    })
});

router.delete('/removeInstructor/:id',(req,res)=>{
    let id = req.params.id;
    let reqBody = req.body;

    Module.findById(id).then((module)=>{
        let InstructorArray = module.Instructors;

        if(InstructorArray.includes(reqBody.Instructors)){
            let index = InstructorArray.indexOf(reqBody.Instructors);

            InstructorArray.splice(index,1);
            Module.findByIdAndUpdate(id,{Instructors: InstructorArray}).then(()=>{
                res.status(200).send('Instructor removed from Module successfully');
            }).catch((err)=>{
                res.status(500).send('Instructor removal failed. Error: '+err);
            })
        }else{
            res.status(500).send('Instructor is not assigned to Module.');
        }
    }).catch((err)=>{
        res.status(500).send('Module not found. Error: '+err)
    })
});

router.put('/addAssignment/:id',(req,res)=>{
    let id = req.params.id;
    let reqBody = req.body;

    Module.findById(id).then((module)=>{
        let AssignmentArray = module.Assignments;

        if(AssignmentArray.includes(reqBody.Assignments)){
            res.status(500).send('Assignment is already assigned to Module.');
        }else{
            AssignmentArray.push(reqBody.Assignments);

            Module.findByIdAndUpdate(id,{Assignments: AssignmentArray}).then(()=>{
                res.status(200).send('Assignment added to Module successfully');
            }).catch((err)=>{
                res.status(500).send('Assignment adding failed. Error: '+err);
            })
        }
    }).catch((err)=>{
        res.status(500).send('Module not found. Error: '+err)
    })
});

router.delete('/removeAssignment/:id',(req,res)=>{
    let id = req.params.id;
    let reqBody = req.body;

    Module.findById(id).then((module)=>{
        let AssignmentArray = module.Assignments;

        if(AssignmentArray.includes(reqBody.Assignments)){
            let index = AssignmentArray.indexOf(reqBody.Assignments);

            AssignmentArray.splice(index,1);
            Module.findByIdAndUpdate(id,{Assignments: AssignmentArray}).then(()=>{
                res.status(200).send('Assignment removed from Module successfully');
            }).catch((err)=>{
                res.status(500).send('Assignment removal failed. Error: '+err);
            })
        }else{
            res.status(500).send('Assignment is not assigned to Module.');
        }
    }).catch((err)=>{
        res.status(500).send('Module not found. Error: '+err)
    })
});

router.put('/addParticipant/:id',(req,res)=>{
    let id = req.params.id;
    let reqBody = req.body;

    Module.findById(id).then((module)=>{
        let ParticipantArray = module.Participants;

        if(ParticipantArray.includes(reqBody.Participants)){
            res.status(500).send('Participant is already assigned to Module.');
        }else{
            ParticipantArray.push(reqBody.Participants);

            Module.findByIdAndUpdate(id,{Participants: ParticipantArray}).then(()=>{
                res.status(200).send('Participant added to Module successfully');
            }).catch((err)=>{
                res.status(500).send('Participant adding failed. Error: '+err);
            })
        }
    }).catch((err)=>{
        res.status(500).send('Module not found. Error: '+err)
    })
});

router.delete('/removeParticipant/:id',(req,res)=>{
    let id = req.params.id;
    let reqBody = req.body;

    Module.findById(id).then((module)=>{
        let ParticipantArray = module.Participants;

        if(ParticipantArray.includes(reqBody.Participants)){
            let index = ParticipantArray.indexOf(reqBody.Participants);

            ParticipantArray.splice(index,1);
            Module.findByIdAndUpdate(id,{Participants: ParticipantArray}).then(()=>{
                res.status(200).send('Participant removed from Module successfully');
            }).catch((err)=>{
                res.status(500).send('Participant removal failed. Error: '+err);
            })
        }else{
            res.status(500).send('Participant is not assigned to Module.');
        }
    }).catch((err)=>{
        res.status(500).send('Module not found. Error: '+err)
    })
});

module.exports = router;