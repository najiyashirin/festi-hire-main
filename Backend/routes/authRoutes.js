const express = require('express');
const {
  registerUser,
  registerTeam,
  login,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();
const upload = require('../middleware/upload');

router.post('/register/user', registerUser);

router.post('/register/team', upload.fields([
  { name: 'photos', maxCount: 5 },
  { name: 'businessLicense', maxCount: 1 },
  { name: 'insurance', maxCount: 1 },
  { name: 'idProof', maxCount: 1 }
]), registerTeam);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;