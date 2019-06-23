const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const AuthorizationAdminInstructorStudent = require('../../Auth/AdminInstructorStudent.auth.middleware');

const Student = require("./Student.model");
router.use(cors());

process.env.SECRET_KEY = 'university';

router.get('/',(req, res) => {
    Student.find().then((students) => {
        res.status(200).json(students);
    }).catch((err) => {
        res.status(500).send('Assignment fetching failed. Error: ' + err);
    })
});

router.get('/:id',(req, res) => {
    let id = req.params.id;
    Student.findById(id).then((students) => {
        res.status(200).json(students);
    }).catch((err) => {
        res.status(500).send('Assignment fetching failed. Error: ' + err);
    })
});

router.post('/studentRegister', (req, res) => {
    const today = new Date();


    Student.findOne({
        email: req.body.email
    })
        .then(student => {
            if (!student) {
                bcrypt.hash(req.body.Password, 10, (err, hash) => {

                    const studentData = new Student({
                        first_name: req.body.fName,
                        last_name: req.body.lName,
                        email: req.body.Email,
                        password: hash,
                        studentId : req.body.StudentId,
                        created: today
                    });
                    Student.create(studentData)
                        .then(student => {
                            res.json({ status: student.email + ' registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'Student already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

router.post('/studentLogin', (req, res) => {
    Student.findOne({
        email: req.body.Email
    }).then(student => {
            if (student) {
                bcrypt.compare(req.body.Password,student.password,(err,same)=>{
                   if(err){
                       res.status(500).send(err);
                   }else{
                       if(same){
                           const payload = {
                               _id: student._id,
                               first_name: student.first_name,
                               last_name: student.last_name,
                               email: student.email,
                               studentId: student.studentId,
                               Type:'Student'
                           };
                           let token = jwt.sign(payload, process.env.SECRET_KEY, {
                               expiresIn: '1h'
                           });
                           res.cookie('token',token,{httpOnly:false});
                           res.status(200).json(student);
                       }else
                           return res.status(500).send('passwords do not match');
                   }
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send('error: ' + err)
        })
});

router.get('/profile',AuthorizationAdminInstructorStudent, (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

    Student.findOne({
        _id: decoded._id
    })
        .then(student => {
            if (student) {
                res.json(student)
            } else {
                res.send("Student does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

router.put('/enroll/:id',(req,res)=>{
    let StudentID = req.params.id;

    Student.findOne(StudentID).then((studentObj)=>{
        let ModulesArray = studentObj.Modules;
        ModulesArray.concat(req.body.Module);

        Student.findByIdAndUpdate(StudentID,{Module:ModulesArray}).then((user)=>{
            res.send('Module enrollment complete,  '+user.first_name);
        }).catch((err)=>{
            res.send(err);
        })
    }).catch((err)=>{
        res.send(err);
    })
});
module.exports = router;