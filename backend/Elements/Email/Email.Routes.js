var nodeMailer = require('nodemailer');
var express=require('express');

var email=express.Router();

//send email to Administrator
email.post('/sendAdmin', function (req, res) {
    const output = `
    <h2 style="text-decoration:underline">Account for Administrator</h2><br/><br/>
    <h3>New Account Information</h3>
    <ul>  
      <li>Username: ${req.body.recieverEmail}</li>
      <li>Password: ${req.body.recieverPassword}</li>
    </ul>
    <h3>Visit University website</h3>
    <p><a href="http://localhost:3000/">http://localhost:3000/</a></p>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter =nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dulith2002@gmail.com', // generated ethereal user
            pass: 'dulith@123'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Administrator"< dulith2002@gmail.com>', // sender address
        to: req.body.recieverEmail, // list of receivers
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
   <h2 style="text-decoration:underline">Account for Instructor</h2><br/><br/>
    <h3>New Account Information</h3>
    <ul>  
      <li>Username: ${req.body.recieverEmail}</li>
      <li>Password: ${req.body.recieverPassword}</li>
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
        from: '"Administrator"< dulith2002@gmail.com>', // sender address
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