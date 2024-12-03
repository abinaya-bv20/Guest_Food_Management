const express = require('express');
const { approveRequest, getPendingRequests } = require('../Controllers/officeController');
const authMiddleware = require('../Middlewares/authMiddleware'); // Ensure this is defined to check for office role
const router = express.Router();

router.post('/approve', authMiddleware(['Office']), approveRequest);
router.get('/pending', authMiddleware(['Office']), getPendingRequests);


module.exports = router;