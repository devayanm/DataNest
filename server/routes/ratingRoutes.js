const express = require('express');
const { rateUser, getUserRatings } = require('../controllers/ratingsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:id/rate', protect, rateUser);           
router.get('/:id/ratings', getUserRatings);            

module.exports = router;
