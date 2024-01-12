const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// TODO: initialize server using express
dotenv.config()
const PORT = process.env.PORT || 4564;
const app = express();
const server = http.createServer(app);

/* TODO: index routing and middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* TODO: add mailserver */
const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.GOOGLE_ACCOUNT}`,
        pass: `${process.env.GOOGLE_PASSWORD}`,
    },
});

const transporterOutlook = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: `${process.env.OUTLOOK_ACCOUNT}`,
        pass: `${process.env.OUTLOOK_PASSWORD}`,
    },
});

/* TODO: setting email */
const mailOptions = {
    from: 'romi.julianto@elnusa.co.id',
    to: 'yuulistina@gmail.com',
    subject: 'Subject of your email',
    html: '<div>tes</div>',
    attachments: [
        {
            filename: 'CV dan Portofolio.pdf',
            path: 'src/document/CV and Portofolio_Romi Julianto_Data Analyst-1.pdf',
            encoding: 'base64',
        },
    ],
};

transporterGmail.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});

transporterOutlook.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});

server.listen(PORT, () => {
    console.log('Server Email SPBU Checking Pertamina listen', `http://localhost:${PORT}`);
});