'use strict';

const moment = require('moment');
const forge = require('node-forge');
var CryptoJS = require("crypto-js");
var bytes = require('utf8-bytes');
const crypto = require ('crypto');

const YEAR_DATE_FORMAT = moment().format('YYYY-MM-DD');


var generateSignature = function (req, res) {
    // console.log(req);
    var apiKey = req.body.apiKey;
    var apiSecret = req.body.apiSecret;
   // var date = "2019-03-06T11:30:00.000";
   var date = '2019-03-06T11:30:00.000';
    var httpMethod = "POST";
	var httpUrl = "/services/api/sts/session";
    var stringToSign = httpMethod + "\nx-csod-api-key:" + apiKey + "\n" + "x-csod-date:" +  date+ "\n" + httpUrl;
    var secretByte = Buffer.from(apiSecret).toString('base64');
    var inputByte= bytes(stringToSign);
  console.log(stringToSign);
  
    var hash = crypto.createHash('sha512').update(stringToSign + apiSecret).digest('hex');
  

    // print result
    console.log(hash);
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