const mongoose = require('mongoose');

const prayerRequestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String
  },
  request: {
    type: String,
    required: true
  },
  urgent: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'prayed'],
    default: 'pending'
  },
  prayedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  prayedAt: {
    type: Date
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PrayerRequest', prayerRequestSchema);