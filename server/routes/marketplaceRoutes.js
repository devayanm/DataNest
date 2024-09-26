const express = require('express');
const { getAvailableData, getDataDetails } = require('../controllers/marketplaceController');
const router = express.Router();

router.get('/', getAvailableData);               
router.get('/:id', getDataDetails);              

module.exports = router;
