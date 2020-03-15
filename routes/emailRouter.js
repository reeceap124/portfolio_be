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

    async function main() {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASS
            },
        });

        let info = await transporter.sendMail({
            from: '"ReecePierson.com Contact Form" <testerEmail12321@mail.com>', // sender address
            to: process.env.EMAIL_DESTINATION, // list of receivers: listed one is a disposable test account
            subject: "ReecePierson.com Contact Request", // Subject line
            text: "Hello world?", // plain text body //doesn't show up
            html: output // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
            res.status(200).json({message: 'Email has been sent.'})
    }

})