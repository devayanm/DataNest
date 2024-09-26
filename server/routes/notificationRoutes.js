const express = require('express');
const { getUserNotifications, markAsRead } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getUserNotifications);  
router.put('/:id/read', protect, markAsRead);   

module.exports = router;
