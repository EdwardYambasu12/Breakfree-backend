const Event = require('../models/Event');

exports.getAllEvents = async (req, res, next) => {
  try {
    const { upcoming, type } = req.query;
    let query = {};
    
    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
    }
    
    if (type) query.type = type;
    
    const events = await Event.find(query).sort({ date: 1 });
    res.json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};