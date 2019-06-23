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
    const secret = 'university';
    let reqBody = req.body;
    Student.find({email: reqBody.Email}).then((userArr)=>{
        let user = userArr[0];
        if(user){
            bcrypt.compare(reqBody.Password,user.password).then((result)=>{
                if(result){
                        //Token Issuing
                        const payload = {
                            Email:reqBody.Email,
                            Type:'Student'
                        };

                        const token = jwt.sign(payload,secret,{expiresIn: '1h'});
                        res.cookie('token',token);
                        res.status(200).json(user);
                }else{
                    res.status(500).send('Login Failed passwords mismatch')
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

router.put('/update/:id', (req, res) => {

    let id = req.params.id;
    let reqObj = req.body;
    let StudentObj = {
        first_name: reqObj.first_name,
        last_name: reqObj.last_name,
        email:reqObj.email,
        password: reqObj.password.toString(),
        studentId:reqObj.studentId
    };
    Student.findByIdAndUpdate(id, StudentObj).then(() => {
        res.status(200).send('Student updated successfully');
    }).catch((err) => {
        res.status(500).send('Student updating failed. Error: ' + err);
    })
});


router.put('/enroll/:id',(req,res)=>{
    let StudentID = req.params.id;
    Student.findById(StudentID).then((studentObj)=>{
        let ModulesArray = studentObj.Modules;
        ModulesArray.push(req.body.Module);

        Student.findByIdAndUpdate(StudentID,{Modules:ModulesArray}).then((user)=>{
            res.send('Module enrollment complete,  '+user.first_name);
        }).catch((err)=>{
            res.send(err);
        })
    }).catch((err)=>{
        res.send(err);
    })
});

module.exports = router;