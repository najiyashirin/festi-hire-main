const Job = require('../models/Job');
const Application = require('../models/Application');
const Team = require('../models/Team');

// @desc    Get all jobs
// @route   GET /api/jobs
exports.getJobs = async (req, res, next) => {
  try {
    const { search, location, urgent } = req.query;
    
    let query = { status: 'active' };

    if (search) {
      query.$or = [
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (urgent === 'true') {
      query.urgent = true;
    }

    const jobs = await Job.find(query)
      .populate('team', 'teamName rating')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('team', 'teamName rating location')
      .populate({
        path: 'applicants',
        populate: {
          path: 'user',
          select: 'email phone profile'
        }
      });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new job
// @route   POST /api/jobs
exports.createJob = async (req, res, next) => {
  try {
    const { role, requirements, location, pay, urgent } = req.body;

    const job = await Job.create({
      team: req.user._id,
      role,
      requirements,
      location,
      pay,
      urgent
    });

    // Add job to team's jobs array
    await Team.findByIdAndUpdate(req.user._id, {
      $push: { jobs: job._id }
    });

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Make sure user is job owner
    if (job.team.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Make sure user is job owner
    if (job.team.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await job.deleteOne();

    // Remove job from team's jobs array
    await Team.findByIdAndUpdate(req.user._id, {
      $pull: { jobs: job._id }
    });

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Apply to job
// @route   POST /api/jobs/:id/apply
exports.applyToJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if already applied
    const alreadyApplied = await Application.findOne({
      user: req.user._id,
      job: job._id
    });

    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: 'Already applied to this job' });
    }

    const application = await Application.create({
      user: req.user._id,
      job: job._id,
      team: job.team
    });

    // Add application to job
    job.applicants.push(application._id);
    await job.save();

    res.status(201).json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get team's job listings
// @route   GET /api/jobs/team/listings
exports.getTeamJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ team: req.user._id })
      .populate('applicants')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status
// @route   PUT /api/jobs/applications/:id
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Make sure the team owns this application's job
    if (application.team.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};