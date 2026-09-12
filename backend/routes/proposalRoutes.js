const express = require('express');
const router = express.Router();
const { submitProposal, getJobProposals } = require('../controllers/proposalController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, submitProposal);
router.get('/job/:jobId', protect, getJobProposals);

module.exports = router;