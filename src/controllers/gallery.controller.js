const Gallery = require('../models/Gallery');

// Get all gallery items
const getAllGalleryItems = async (req, res, next) => {
  try {
    console.log('🖼️ Getting all gallery items - PUBLIC ACCESS');
    const items = await Gallery.find({ published: true }).sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Get gallery items error:', error);
    next(error);
  }
};

// Get all gallery items for admin (including unpublished)
const getAllGalleryItemsAdmin = async (req, res, next) => {
  try {
    console.log('🖼️ Getting all gallery items - ADMIN ACCESS');
    const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Get gallery items admin error:', error);
    next(error);
  }
};

// Create gallery item
const createGalleryItem = async (req, res, next) => {
  try {
    console.log('🖼️ Creating gallery item:', req.body);
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error('Create gallery item error:', error);
    next(error);
  }
};

// Update gallery item
const updateGalleryItem = async (req, res, next) => {
  try {
    console.log('🖼️ Updating gallery item:', req.params.id);
    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Update gallery item error:', error);
    next(error);
  }
};

// Delete gallery item
const deleteGalleryItem = async (req, res, next) => {
  try {
    console.log('🖼️ Deleting gallery item:', req.params.id);
    const item = await Gallery.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    next(error);
  }
};

// Export all functions
module.exports = {
  getAllGalleryItems,
  getAllGalleryItemsAdmin,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};