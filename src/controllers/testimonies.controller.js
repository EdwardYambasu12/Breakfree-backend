const Testimony = require('../models/Testimony');

exports.getAllTestimonies = async (req, res, next) => {
  try {
    const { status, category, featured, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    
    const testimonies = await Testimony.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Testimony.countDocuments(query);
    
    res.json({
      success: true,
      data: testimonies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.submitTestimony = async (req, res, next) => {
  try {
    const testimony = await Testimony.create(req.body);
    
    res.status(201).json({
      success: true,
      data: testimony,
      message: 'Testimony submitted successfully. It will be reviewed before publishing.'
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTestimonyStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updateData = { status };
    
    if (status === 'approved') {
      updateData.approvedBy = "693be9f7ffa098de49587858";
      updateData.approvedAt = new Date();
    }
    
    const testimony = await Testimony.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!testimony) {
      return res.status(404).json({ message: 'Testimony not found' });
    }
    
    res.json({ success: true, data: testimony });
  } catch (error) {
    next(error);
  }
};

exports.deleteTestimony = async (req, res, next) => {
  try {
    const testimony = await Testimony.findByIdAndDelete(req.params.id);
    
    if (!testimony) {
      return res.status(404).json({ message: 'Testimony not found' });
    }
    
    res.json({ success: true, message: 'Testimony deleted successfully' });
  } catch (error) {
    next(error);
  }
};