const Blog = require('../models/Blog');

// Get all blogs
const getAllBlogs = async (req, res, next) => {
  try {
    console.log('📝 Getting all blogs - PUBLIC ACCESS');
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    next(error);
  }
};

// Create blog
const createBlog = async (req, res, next) => {
  try {
    console.log('📝 Creating blog:', req.body);
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error('Create blog error:', error);
    next(error);
  }
};

// Update blog
const updateBlog = async (req, res, next) => {
  try {
    console.log('📝 Updating blog:', req.params.id);
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('Update blog error:', error);
    next(error);
  }
};

// Delete blog
const deleteBlog = async (req, res, next) => {
  try {
    console.log('📝 Deleting blog:', req.params.id);
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    next(error);
  }
};

// Get blog by slug
const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

// Export all functions
module.exports = {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
};