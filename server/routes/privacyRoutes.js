const express = require('express');
const { updateAccessControl } = require('../controllers/dataPrivacyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/:id/access-control', protect, updateAccessControl);

module.exports = router;
