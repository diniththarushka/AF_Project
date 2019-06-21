const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Admin= require("./Admin.model");
router.use(cors());

process.env.SECRET_KEY = 'secret';

// register
router.post('/register', (req, res) => {
    const today = new Date();
    const adminData = {
        name: req.body.name,
        contactNo:req.body.contactNo,
        address:req.body.address,
        email: req.body.email,
        password: req.body.password,
        created: today
    };

    Admin.findOne({
        email: req.body.email
    })
        .then(admin => {
            if (!admin ) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    adminData.password = hash;
                    Admin.create(adminData)
                        .then(admin => {
                            res.status(200).send({msg:'Registered Sucessfully',data:adminData});
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.status(400).json({ error: 'Administator already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

//login
router.post('/login', (req, res) => {
    Admin.findOne({
        email: req.body.email
    })
        .then(admin => {
            if (admin) {
                if (bcrypt.compareSync(req.body.password, admin.password)) {
                    const payload = {
                        _id: admin._id,
                        name: admin.name,
                        contactNo:admin.contactNo,
                        address:admin.address,
                        email: admin.email
                    };
                    console.log(payload._id);
                    res.status(200).send({data:payload});


                } else {
                    res.status(400).json({ error: "Administrator does not exist" })
                }
            } else {
                res.status(400).json({ error: "Administrator does not exist" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

//Return profile of user
router.get('/profile/:id', (req, res) => {
   var _id=req.params.id;
   Admin.findOne({
        _id: _id
    })
        .then(admin => {
            if (admin) {
                res.status(200).send({data:admin});
            } else {
                res.send("Administrator does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

//get List of registered administrators
router.get('/adminList', (req, res) => {
    Admin.find().exec().then((admins) => {
        console.log(admins);
        res.status(200).send(admins);
    }).catch(err => {
        res.status(500).send({message: err.message});
    })
});

module.exports = router;