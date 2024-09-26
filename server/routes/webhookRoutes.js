const express = require('express');
const { handleWebhook } = require('../controllers/webhookController');
const router = express.Router();

router.post('/', handleWebhook); // Webhook endpoint

module.exports = router;
