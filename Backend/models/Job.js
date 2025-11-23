const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  role: {
    type: String,
    required: true
  },
  requirements: {
    age: String,
    skills: String,
    responsibilities: String
  },
  location: {
    type: String,
    required: true
  },
  pay: {
    type: String,
    required: true
  },
  urgent: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'paused'],
    default: 'active'
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);