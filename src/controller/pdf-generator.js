'use strict';

const moment = require('moment');
const walk = require('walk');
const nodemailer = require("nodemailer");
const zlib = require('zlib');
const fs = require('fs');


const YEAR_DATE_FORMAT = moment().format('YYYY-MM-DD');
const FILE_NAME = 'report_' + YEAR_DATE_FORMAT+'.pdf';
const FILE_DIR = 'logs/';

var generatePDF = function (req, res) {
    var conversion = require("phantom-html-to-pdf")();
    var jsonResponse = `<h1>${req.body.message}</h1>`;
    conversion({ html: jsonResponse }, function (err, pdf) {
        var output = fs.createWriteStream(FILE_DIR + FILE_NAME);
        pdf.stream.pipe(output);
    });
    res.sendStatus(200);
    main().catch(console.error);
};

async function main() {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "afitestadm@gmail.com", // generated ethereal user
            pass: "!Infor01" // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: '<afitestmanager@gmail.com>', // sender address
        to: "mikhail.mendoza@infor.com", // list of receivers
        subject: "Payroll Report", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Payroll Report</b>", // html body
        attachments: [
            {   // file on disk as an attachment
                filename: FILE_NAME,
                path: FILE_DIR + FILE_NAME // stream this file
            }
        ]
    };

    // send mail with defined transport object
    var info = await transporter.sendMail(mailOptions)
    console.log(info.messageId);
    setTimeout(() => {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        fs.unlink(FILE_DIR + FILE_NAME);
    }, 5000);

};

module.exports = { generatePDF };