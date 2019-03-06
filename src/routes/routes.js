'use strict';

const express = require('express');
const router = express.Router();
const url = require('url');

const CONTROLLER = require('../controller');
const HELPER = require('../helper');

const { START_APP, WEBHOOK_INTEGRATION, CLASSMAKER_INTEGRATION,PDF_GENERATOR,SIGNATURE_GENERATOR } = CONTROLLER;
const { LOGGER } = HELPER;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  LOGGER.log('Access:' + url.parse(req.url).pathname);
  next();
});

// define the home page route
router.get('/start', START_APP.startApp);
router.post('/cook-childrens/webhook', WEBHOOK_INTEGRATION.webhookIntegration);
router.post('/launchLmsTest', CLASSMAKER_INTEGRATION.launchExam);
router.post('/generatePDF', PDF_GENERATOR.generatePDF);
router.post('/generateSignature', SIGNATURE_GENERATOR.generateSignature);
module.exports = router;
