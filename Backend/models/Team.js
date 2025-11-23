const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teamSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  categories: [{
    type: String,
    enum: ['Catering', 'Entertainment', 'Transportation', 'Decoration', 'Photography', 'Security', 'Other']
  }],
  locations: [String],
  bio: String,
  photos: [String],
  verified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: {
    businessLicense: String,
    insurance: String,
    idProof: String
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  members: {
    type: Number,
    default: 0
  },
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

teamSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

teamSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Team', teamSchema);