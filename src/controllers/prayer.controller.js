const PrayerRequest = require('../models/PrayerRequest');

exports.getAllPrayerRequests = async (req, res, next) => {
  try {
    const { status, urgent, page = 1, limit = 20 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (urgent === 'true') query.urgent = true;
    
    const requests = await PrayerRequest.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    const total = await PrayerRequest.countDocuments(query);
    
    res.json({
      success: true,
      data: requests,
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

exports.submitPrayerRequest = async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const request = await PrayerRequest.create({
      ...req.body,
      ipAddress: ip
    });
    
    res.status(201).json({
      success: true,
      data: request,
      message: 'Prayer request submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.markAsPrayed = async (req, res, next) => {
  try {
    const request = await PrayerRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: 'prayed',
        prayedBy: "68fcd1cba4678107afa506e3",
        prayedAt: new Date()
      },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Prayer request not found' });
    }
    
    res.json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};

exports.deletePrayerRequest = async (req, res, next) => {
  try {
    const request = await PrayerRequest.findByIdAndDelete(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Prayer request not found' });
    }
    
    res.json({ success: true, message: 'Prayer request deleted' });
  } catch (error) {
    next(error);
  }
};