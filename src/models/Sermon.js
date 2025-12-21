const mongoose = require('mongoose');

const sermonSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['video', 'audio'],
    default: 'video'
  },
  url: {
    type: String
  },
  duration: {
    type: String
  },
  speaker: {
    type: String,
    default: 'Minister Moira Boakai'
  },
  series: {
    type: String
  },
  scripture: {
    type: String
  },
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sermon', sermonSchema);