const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

//setup body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

router.post('/', (req, res)=>{
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    
        let transporter = nodeMailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASS
            }
        });

        let info = transporter.sendMail({
            from: `"ReecePierson.com" <${process.env.EMAIL_DESTINATION}>`, // sender address
            to: process.env.EMAIL_DESTINATION, // list of receivers: listed one is a disposable test account
            subject: "New Contact Request", // Subject line
            text: "Hello world?", // plain text body //doesn't show up
            html: output // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
    
            res.status(200).json({message: 'Email has been sent.'})
    

})

module.exports = router