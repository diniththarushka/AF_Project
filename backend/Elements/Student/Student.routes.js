const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const AuthorizationAdminInstructor = require('../../Auth/AdminInstructor.auth.middleware');
const AuthorizationAdminInstructorStudent = require('../../Auth/AdminInstructorStudent.auth.middleware');

const Student = require("./Student.model");
router.use(cors());

process.env.SECRET_KEY = 'university';

router.get('/',AuthorizationAdminInstructor,(req, res) => {
    Student.find().then((assignments) => {
        res.status(200).json(assignments);
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

                    const studentData = {
                        first_name: req.body.fName,
                        last_name: req.body.lName,
                        email: req.body.Email,
                        password: hash,
                        studentId : req.body.StudentId,
                        created: today
                    };
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
                if (bcrypt.compareSync(req.body.Password, student.password)) {
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
                } else {
                    res.status(500).json({ error: "Student does not exist" })
                }
            } else {
                res.status(500).json({ error: "Student does not exist" })
            }
        })
        .catch(err => {
            res.status(500).send('error: ' + err)
        })
});

router.get('/profile',AuthorizationAdminInstructorStudent, (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

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

module.exports = router;