const express = require('express');
const { getUserActivityLogs } = require('../controllers/activityLogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getUserActivityLogs);  

module.exports = router;
