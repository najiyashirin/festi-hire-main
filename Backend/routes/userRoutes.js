const express = require('express');
const {
	updateProfile,
	getApplications,
	deleteAccount
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get own profile
router.get('/profile', protect, authorize('user'), (req, res, next) => {
	return require('../controllers/userController').getProfile(req, res, next);
});

// Update own profile (multipart/form-data for photo)
router.put('/profile', protect, authorize('user'), upload.single('photo'), updateProfile);

// Get user applications
router.get('/applications', protect, authorize('user'), getApplications);

// Delete account
router.delete('/account', protect, authorize('user'), deleteAccount);

module.exports = router;

