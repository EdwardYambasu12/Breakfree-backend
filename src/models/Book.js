const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Minister Moira Boakai'
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Coming Soon', 'Available', 'Out of Stock'],
    default: 'Coming Soon'
  },
  coverImage: {
    type: String
  },
  isbn: {
    type: String
  },
  pages: {
    type: Number
  },
  publishedDate: {
    type: Date
  },
  categories: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);