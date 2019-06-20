const express = require("express")
const router = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const Student = require("./Student.model")
router.use(cors())

process.env.SECRET_KEY = 'secret'


router.post('/studentRegister', (req, res) => {
    const today = new Date()
    const studentData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        studentid : req.body.studentid,
        created: today
    }

    Student.findOne({
        email: req.body.email
    })
        .then(student => {
            if (!student) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    studentData.password = hash
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
        email: req.body.email
    })
        .then(student => {
            if (student) {
                if (bcrypt.compareSync(req.body.password, student.password)) {
                    const payload = {
                        _id: student._id,
                        first_name: student.first_name,
                        last_name: student.last_name,
                        email: student.email,
                        studentid: student.studentid
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ error: "Student does not exist" })
                }
            } else {
                res.json({ error: "Student does not exist" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.get('/profile', (req, res) => {
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
})

module.exports = router