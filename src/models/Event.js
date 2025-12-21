const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  venue: {
    type: String
  },
  type: {
    type: String,
    enum: ['service', 'conference', 'workshop', 'prayer'],
    default: 'service'
  },
  featured: {
    type: Boolean,
    default: false
  },
  registrationLink: {
    type: String
  },
  maxAttendees: {
    type: Number
  },
  attendeesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);