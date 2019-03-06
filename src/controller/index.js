const START_APP = require('./start'),
    LMS_INTEGRATION = require('./lms-integration'),
    WEBHOOK_INTEGRATION = require('./webhook-integration'),
    CLASSMAKER_INTEGRATION = require('./classmaker-integration'),
    SIGNATURE_GENERATOR = require('./signature-generator'),
    PDF_GENERATOR = require('./pdf-generator');

module.exports = { LMS_INTEGRATION, START_APP, WEBHOOK_INTEGRATION, CLASSMAKER_INTEGRATION,SIGNATURE_GENERATOR,PDF_GENERATOR };
