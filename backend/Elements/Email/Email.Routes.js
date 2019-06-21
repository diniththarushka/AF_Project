var nodeMailer = require('nodemailer');
var express=require('express');

var email=express.Router();

//send email to Administrator
email.post('/sendAdmin', function (req, res) {
    const output = `
    <p>Account for Administrator</p>
    <h3>New Account Information</h3>
    <ul>  
      <li>Username: ${req.body.email}</li>
      <li>password: ${req.body.password}</li>
    </ul>
    <h3>Visit University website</h3>
    <p><a href="http://localhost:3000/">http://localhost:3000/</a></p>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter =nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mkvathanan@gmail.com', // generated ethereal user
            pass: 'Vathanan123'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Administrator"< mkvathanan@gmail.com>', // sender address
        to: 'm.kajavathanan@yahoo.com', // list of receivers
        subject: 'New Account for Administrator', // Subject line
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.json('Account', {msg:'Email has been sent'});
    });
});

//send email to Instructor
email.post('/sendIns', function (req, res) {
    const output = `
    <p>Account for Instructor</p>
    <h3>New Account Information</h3>
    <ul>  
      <li>Username: ${req.body.email}</li>
      <li>password: ${req.body.password}</li>
    </ul>
    <h3>Visit University website</h3>
    <p><a href="http://localhost:3000/">http://localhost:3000/</a></p>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter =nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mkvathanan@gmail.com', // generated ethereal user
            pass: 'Vathanan123'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Administrator"< mkvathanan@gmail.com>', // sender address
        to: 'm.kajavathanan@yahoo.com', // list of receivers
        subject: 'New Account for Administrator', // Subject line
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.json('Account', {msg:'Email has been sent'});
    });
});

module.exports=email;