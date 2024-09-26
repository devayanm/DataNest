const express = require('express');
const { updateViews, getUserDataAnalytics } = require('../controllers/dataAnalyticsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/:id/views', updateViews);                   // Update views count
router.get('/user/analytics', protect, getUserDataAnalytics); // Get user's data analytics

module.exports = router;
