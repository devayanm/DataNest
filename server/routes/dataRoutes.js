const express = require('express');
const { createData, getAllData, purchaseData } = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createData);      
router.get('/', getAllData);                      
router.put('/purchase/:id', protect, purchaseData); 

module.exports = router;
