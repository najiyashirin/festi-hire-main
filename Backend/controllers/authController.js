const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Team = require('../models/Team');

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register user
// @route   POST /api/auth/register/user
exports.registerUser = async (req, res, next) => {
  try {
    const { email, password, phone } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
      phone,
      role: 'user'
    });

    const token = generateToken(user._id, 'user');

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        role: 'user'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register team
// @route   POST /api/auth/register/team
exports.registerTeam = async (req, res, next) => {
  try {
    // Accept multipart/form-data; files are available on req.files
    let { email, password, phone, teamName, categories, locations, bio } = req.body;

    // Normalize categories and locations if sent as comma-separated strings
    const parseList = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed.startsWith('[')) {
          try { return JSON.parse(trimmed); } catch (e) { /* ignore */ }
        }
        return trimmed.split(',').map(s => s.trim()).filter(Boolean);
      }
      return [];
    };

    categories = parseList(categories);
    locations = parseList(locations);

    const teamExists = await Team.findOne({ email });
    if (teamExists) {
      return res.status(400).json({ success: false, message: 'Team already exists' });
    }

    const teamData = {
      email,
      password,
      phone,
      teamName,
      categories,
      locations,
      bio
    };

    // Handle uploaded photos
    if (req.files && req.files.photos) {
      teamData.photos = req.files.photos.map(f => f.path);
    }

    // Handle optional verification documents
    if (req.files) {
      teamData.verificationDocuments = {
        businessLicense: req.files.businessLicense ? req.files.businessLicense[0].path : undefined,
        insurance: req.files.insurance ? req.files.insurance[0].path : undefined,
        idProof: req.files.idProof ? req.files.idProof[0].path : undefined
      };
    }

    const team = await Team.create(teamData);

    const token = generateToken(team._id, 'team');

    res.status(201).json({
      success: true,
      token,
      team: {
        id: team._id,
        email: team.email,
        teamName: team.teamName,
        role: 'team'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user/team
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user
    let account = await User.findOne({ email });
    let role = 'user';

    // If not user, check for team
    if (!account) {
      account = await Team.findOne({ email });
      role = 'team';
    }

    if (!account) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await account.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(account._id, role);

    res.status(200).json({
      success: true,
      token,
      role,
      user: {
        id: account._id,
        email: account.email,
        ...(role === 'team' ? { teamName: account.teamName } : {})
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    let account;
    
    if (req.userRole === 'user') {
      account = await User.findById(req.user._id).select('-password');
    } else {
      account = await Team.findById(req.user._id).select('-password');
    }

    res.status(200).json({
      success: true,
      data: account
    });
  } catch (error) {
    next(error);
  }
};