const express = require('express');
const router = express.Router();
const Instructor = require('./Instructor.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthorizationAdminInstructor = require('../../Auth/AdminInstructor.auth.middleware');
const AuthorizationAdmin = require('../../Auth/Admin.auth.middleware');

router.get('/', (req, res) => {
    Instructor.find().then((instructors) => {
        res.status(200).json(instructors);
    }).catch((err) => {
        res.status(500).send('Instructor fetching failed. Error: ' + err);
    });
});

router.post('/auth',(req,res)=>{
    const secret = 'university';
    let reqBody = req.body;
   Instructor.findOne({Email: reqBody.Email}).then((user)=>{
       if(user){
           bcrypt.compare(reqBody.Password,user.Password,(err,passwordsame)=>{
               if(err){
                   res.status(500).send('Login Failed')
               }else{
                   if(passwordsame){
                       //Token Issuing
                       const payload = {
                           Email:reqBody.Email,
                           Type:'Instructor'
                       };

                       const token = jwt.sign(payload,secret,{expiresIn: '1h'});
                       res.cookie('token',token);
                       res.status(200).json(user);
                   }else
                       return res.status(500).send('passwords do not match');
               }
           });
       }else{
           res.status(500).send('User records not found');
       }
   }).catch((err)=>{
       if(err){
           res.status(500).send('User fetching failed');
       }
   })
});



router.get('/:id', (req, res) => {
    let id = req.params.id;
    Instructor.findById(id).then((instructor) => {
        res.status(200).json(instructor);
    }).catch((err) => {
        res.status(500).send('Instructor fetching failed. Error: ' + err);
    });
});

router.post('/',AuthorizationAdmin, (req, res) => {


    let reqObj = req.body;
    let InstructorObj = new Instructor({
        Name: reqObj.Name,
        Email: reqObj.Email,
        Password: reqObj.Password,
        Faculty: reqObj.Faculty,
        Modules: reqObj.Modules
    });
    InstructorObj.save().then(() => {
        res.status(200).send('Instructor added successfully');
    }).catch((err) => {
        res.status(500).send('Instructor adding failed. Error: ' + err);
    })
});

router.put('/:id',AuthorizationAdminInstructor, (req, res) => {
    let id = req.params.id;
    let reqObj = req.body;
    let InstructorObj = {
        Name: reqObj.Name,
        Email: reqObj.Email,
        Password: reqObj.Password,
        Faculty: reqObj.Faculty,
        Modules: reqObj.Modules
    };
    Instructor.findByIdAndUpdate(id, InstructorObj).then(() => {
        res.status(200).send('Instructor updated successfully');
    }).catch((err) => {
        res.status(500).send('Instructor updating failed. Error: ' + err);
    })
});

router.put('/update/:id',AuthorizationAdminInstructor, (req, res) => {
    let id = req.params.id;
    let reqObj = req.body;
    let InstructorObj = {
        Name: reqObj.Name,
        Email: reqObj.Email,
        Password: reqObj.Password
    };
    Instructor.findByIdAndUpdate(id, InstructorObj).then(() => {
        res.status(200).send('Instructor updated successfully');
    }).catch((err) => {
        res.status(500).send('Instructor updating failed. Error: ' + err);
    })
});

router.delete('/:id',AuthorizationAdmin, (req, res) => {
    let id = req.params.id;
    Instructor.findByIdAndDelete(id).then(() => {
        res.status(200).send('Instructor deleted successfully');
    }).catch((err) => {
        res.status(500).send('Instructor deleting failed. Error: ' + err);
    })
});

router.delete('/deleteModule/:id',AuthorizationAdminInstructor, (req, res) => { //for deleting modules of the schema element array one by one(should send req as {"Faculty":"faculty name"})
    let id = req.params.id;
    let reqBody = req.body;
    let ModulesUpd = [];
    Instructor.findById(id).then((instructor) => {
        ModulesUpd = instructor.Modules;

        if (ModulesUpd.includes(reqBody.Module)) {
            let index = ModulesUpd.indexOf(reqBody.Module);
            ModulesUpd.splice(index, 1);

            Instructor.findByIdAndUpdate(id, {Modules: ModulesUpd}).then(() => {
                res.status(200).send('Module deleted successfully');
            }).catch((err) => {
                res.status(500).send('Module deleting failed. Error: ' + err);
            })
        } else {
            res.status(500).send('Module not assigned to delete.');
        }
    }).catch((err) => {
        res.status(500).send('Instructor fetching failed. Error: ' + err);
    })
});

router.put('/addModule/:id',AuthorizationAdminInstructor, (req, res) => {       //for adding modules to the schema element array one by one(should send req as {"Module":"module name"})
    let id = req.params.id;
    let reqBody = req.body;
    let ModulesUpd = [];
    Instructor.findById(id).then((instructor) => {
        ModulesUpd = instructor.Modules;

        if (ModulesUpd.includes(reqBody.Module)) {
            res.status(500).send('Module is already assigned');
        } else {
            ModulesUpd.push(reqBody.Module);
            Instructor.findByIdAndUpdate(id, {Modules: ModulesUpd}).then(() => {
                res.status(200).send('Module added successfully');
            }).catch((err) => {
                res.status(500).send('Module adding failed. Error: ' + err);
            })
        }
    }).catch((err) => {
        res.status(500).send('Instructor fetching failed. Error: ' + err);
    })
});

router.delete('/deleteFaculty/:id',AuthorizationAdminInstructor, (req, res) => { //for deleting multiple faculties to the schema element array one by one(should send req as {"Faculty":"faculty name"})
    let id = req.params.id;
    let reqBody = req.body;
    let FacultiesUpd = [];
    Instructor.findById(id).then((instructor) => {
        FacultiesUpd = instructor.Faculty;

        if (FacultiesUpd.includes(reqBody.Faculty)) {
            let index = FacultiesUpd.indexOf(reqBody.Faculty);
            FacultiesUpd.splice(index, 1);

            Instructor.findByIdAndUpdate(id, {Faculty: FacultiesUpd}).then(() => {
                res.status(200).send('Faculty deleted successfully');
            }).catch((err) => {
                res.status(500).send('Faculty deleting failed. Error: ' + err);
            })
        } else {
            res.status(500).send('Faculty not assigned to delete.');
        }
    }).catch((err) => {
        res.status(500).send('Instructor fetching failed. Error: ' + err);
    })
});

router.put('/addFaculty/:id',AuthorizationAdminInstructor, (req, res) => {       //for adding multiple faculties to the schema element array one by one(should send req as {"Faculty":"faculty name"})
    let id = req.params.id;
    let reqBody = req.body;
    let FacultiesUpd = [];
    Instructor.findById(id).then((instructor) => {
        FacultiesUpd = instructor.Faculty;

        if (FacultiesUpd.includes(reqBody.Faculty)) {
            res.status(500).send('Faculty is already assigned');
        } else {
            FacultiesUpd.push(reqBody.Faculty);
            Instructor.findByIdAndUpdate(id, {Faculty: FacultiesUpd}).then(() => {
                res.status(200).send('Faculty added successfully');
            }).catch((err) => {
                res.status(500).send('Faculty adding failed. Error: ' + err);
            })
        }
    }).catch((err) => {
        res.status(500).send('Instructor fetching failed. Error: ' + err);
    })
});

module.exports = router;