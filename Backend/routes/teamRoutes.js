const express = require('express');
const {
  getTeams,
  getTeam,
  getOwnProfile,
  updateProfile,
  uploadVerificationDocs,
  addReview,
  deleteAccount
} = require('../controllers/teamController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getTeams);
// Protected: get own profile (service provider only)
router.get('/profile', protect, authorize('team'), getOwnProfile);
router.get('/:id', getTeam);

// Protected routes
router.put('/profile', protect, authorize('team'), upload.array('photos', 5), updateProfile);
router.post('/verify', protect, authorize('team'), upload.fields([
  { name: 'businessLicense', maxCount: 1 },
  { name: 'insurance', maxCount: 1 },
  { name: 'idProof', maxCount: 1 }
]), uploadVerificationDocs);
router.post('/:id/reviews', protect, authorize('user'), addReview);
router.delete('/account', protect, authorize('team'), deleteAccount);

module.exports = router;