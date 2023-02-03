const express = require('express');
const router = express.Router();
const utilController = require('../controllers/utilController');

router.post('/save',utilController.createCompanies);

module.exports = router;