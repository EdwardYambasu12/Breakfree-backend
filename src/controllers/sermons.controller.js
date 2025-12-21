const Sermon = require('../models/Sermon');

exports.getAllSermons = async (req, res, next) => {
  try {
    const { type, series, year, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (type) query.type = type;
    if (series) query.series = series;
    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    const sermons = await Sermon.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await Sermon.countDocuments(query);
    
    res.json({
      success: true,
      data: sermons,
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

exports.getSermonById = async (req, res, next) => {
  try {
    const sermon = await Sermon.findById(req.params.id);
    
    if (!sermon) {
      return res.status(404).json({ message: 'Sermon not found' });
    }
    
    // Increment views
    sermon.views += 1;
    await sermon.save();
    
    res.json({ success: true, data: sermon });
  } catch (error) {
    next(error);
  }
};

exports.createSermon = async (req, res, next) => {
  try {
    const sermon = await Sermon.create(req.body);
    res.status(201).json({ success: true, data: sermon });
  } catch (error) {
    next(error);
  }
};

exports.updateSermon = async (req, res, next) => {
  try {
    const sermon = await Sermon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!sermon) {
      return res.status(404).json({ message: 'Sermon not found' });
    }
    
    res.json({ success: true, data: sermon });
  } catch (error) {
    next(error);
  }
};

exports.deleteSermon = async (req, res, next) => {
  try {
    const sermon = await Sermon.findByIdAndDelete(req.params.id);
    
    if (!sermon) {
      return res.status(404).json({ message: 'Sermon not found' });
    }
    
    res.json({ success: true, message: 'Sermon deleted successfully' });
  } catch (error) {
    next(error);
  }
};