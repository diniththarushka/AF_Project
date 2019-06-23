var nodeMailer = require('nodemailer');
var express=require('express');

var email=express.Router();

let EmailModel=require('./Email.model');

//send email to Administrator
email.post('/sendAdmin', function (req, res) {
    const output = `
    <h2 style="text-decoration:underline">Account for Administrator</h2><br/><br/>
    <h3>New Account Information</h3>
    <ul>  
      <li>Username: ${req.body.reciever.email}</li>
      <li>Password: ${req.body.reciever.password}</li>
    </ul>
    <h3>Visit University website</h3>
    <p><a href="http://localhost:3000/">http://localhost:3000/</a></p>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter =nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.body.sender.email, // generated ethereal user
            pass: req.body.sender.password  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Administrator"<'.concat(req.body.reciever.email).concat('>'), // sender address
        to: req.body.reciever.email, // list of receivers
        subject: 'New Account for Administrator', // Subject line
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        let obj=req.body;
        console.log(obj);
        let EmailObj = new EmailModel({
            sender: obj.sender,
            reciever:obj.reciever
        });
        EmailObj.save().then(() => {
            res.status(200).send('Message sent successfully');
        }).catch((err) => {
            res.status(500).send('Message sent failed. Error: ' + err);
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.json('Account', {msg:'Email has been sent'});
    });
});

// send email to Instructor
email.post('/sendIns', function (req, res) {
    const output = `
    <h2 style="text-decoration:underline">Account for Administrator</h2><br/><br/>
    <h3>New Account Information</h3>
    <ul>  
      <li>Username: ${req.body.reciever.email}</li>
      <li>Password: ${req.body.reciever.password}</li>
    </ul>
    <h3>Visit University website</h3>
    <p><a href="http://localhost:3000/">http://localhost:3000/</a></p>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter =nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.body.sender.email, // generated ethereal user
            pass: req.body.sender.password  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Administrator"<'.concat(req.body.reciever.email).concat('>'), // sender address
        to: req.body.reciever.email, // list of receivers
        subject: 'New Account for Administrator', // Subject line
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        let obj=req.body;
        console.log(obj);
        let EmailObj = new EmailModel({
            sender: obj.sender,
            reciever:obj.reciever
        });
        EmailObj.save().then(() => {
            res.status(200).send('Message sent successfully');
        }).catch((err) => {
            res.status(500).send('Message sent failed. Error: ' + err);
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.json('Account', {msg:'Email has been sent'});
    });
});

module.exports=email;