const express = require('express');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  applyToJob,
  getTeamJobs,
  updateApplicationStatus
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJob);

// Team routes
router.post('/', protect, authorize('team'), createJob);
router.put('/:id', protect, authorize('team'), updateJob);
router.delete('/:id', protect, authorize('team'), deleteJob);
router.get('/team/listings', protect, authorize('team'), getTeamJobs);
router.put('/applications/:id', protect, authorize('team'), updateApplicationStatus);

// User routes
router.post('/:id/apply', protect, authorize('user'), applyToJob);

module.exports = router;