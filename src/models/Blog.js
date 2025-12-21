const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Minister Moira Boakai'
  },
  category: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  featuredImage: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  },
  tags: [String]
}, {
  timestamps: true
});

// Generate slug before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);