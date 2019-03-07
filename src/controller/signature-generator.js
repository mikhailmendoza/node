'use strict';

const moment = require('moment');
const forge = require('node-forge');
var CryptoJS = require("crypto-js");
var bytes = require('utf8-bytes');
const crypto = require('crypto');

const YEAR_DATE_FORMAT = moment().format('YYYY-MM-DD');


var generateSignature = function (req, res) {
    // console.log(req);
    var apiKey = req.body.apiKey;
    var apiSecret = req.body.apiSecret;
   
    var httpMethod = "POST";
    var httpUrl = "/services/api/sts/session";
    var currentDate = new Date().toISOString();
    var stringToSign = httpMethod + "\nx-csod-api-key:" + apiKey + "\n" + "x-csod-date:" + currentDate + "\n" + httpUrl;
    var secret = Buffer.from(apiSecret, 'base64');
    var hash = crypto.createHmac('sha512', secret)
        .update(stringToSign)
        .digest('byte');

    var signature = Buffer.from(hash).toString('base64');

    return res.json(signature);
   
};

var computeHmac = function (jsonData, secret) {
    var hmac = forge.hmac.create();
    hmac.start('sha256', secret);
    var jsonString = JSON.stringify(jsonData);
    var jsonBytes = Buffer.from(jsonString, 'ascii');
    hmac.update(jsonBytes);
    return forge.util.encode64(hmasc.digest().bytes());
};


module.exports = { generateSignature };