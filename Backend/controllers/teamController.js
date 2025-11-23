const Team = require('../models/Team');
const Job = require('../models/Job');

// @desc    Get all teams
// @route   GET /api/teams
exports.getTeams = async (req, res, next) => {
  try {
    const { category, search, location } = req.query;
    
    let query = { verified: true };

    if (category && category !== 'All') {
      query.categories = category;
    }

    if (search) {
      query.teamName = { $regex: search, $options: 'i' };
    }

    if (location) {
      query.locations = { $regex: location, $options: 'i' };
    }

    const teams = await Team.find(query).select('-password -verificationDocuments');

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single team
// @route   GET /api/teams/:id
exports.getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .select('-password -verificationDocuments')
      .populate('jobs');

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    res.status(200).json({
      success: true,
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get own team profile (protected)
// @route   GET /api/teams/profile
exports.getOwnProfile = async (req, res, next) => {
  try {
    // req.user should be set by protect middleware
    const team = await Team.findById(req.user._id)
      .select('-password -verificationDocuments')
      .populate('jobs');

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};

// @desc    Update team profile
// @route   PUT /api/teams/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { teamName, categories, locations, bio, members } = req.body;

    const team = await Team.findById(req.user._id);

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    team.teamName = teamName || team.teamName;
    team.categories = categories || team.categories;
    team.locations = locations || team.locations;
    team.bio = bio || team.bio;
    team.members = members || team.members;

    if (req.files && req.files.length > 0) {
      team.photos = req.files.map(file => file.path);
    }

    await team.save();

    res.status(200).json({
      success: true,
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload verification documents
// @route   POST /api/teams/verify
exports.uploadVerificationDocs = async (req, res, next) => {
  try {
    const team = await Team.findById(req.user._id);

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    if (req.files) {
      team.verificationDocuments = {
        businessLicense: req.files.businessLicense ? req.files.businessLicense[0].path : null,
        insurance: req.files.insurance ? req.files.insurance[0].path : null,
        idProof: req.files.idProof ? req.files.idProof[0].path : null
      };
    }

    await team.save();

    res.status(200).json({
      success: true,
      message: 'Documents uploaded successfully',
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add review to team
// @route   POST /api/teams/:id/reviews
exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    const review = {
      user: req.user.email,
      rating,
      comment
    };

    team.reviews.push(review);
    
    // Recalculate average rating
    team.rating = team.reviews.reduce((acc, item) => item.rating + acc, 0) / team.reviews.length;

    await team.save();

    res.status(201).json({
      success: true,
      data: team.reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete team account
// @route   DELETE /api/teams/account
exports.deleteAccount = async (req, res, next) => {
  try {
    await Team.findByIdAndDelete(req.user._id);
    
    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};