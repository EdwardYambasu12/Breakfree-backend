const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogBySlug
} = require('../controllers/blog.controller');
const {
  getAllBooks
} = require('../controllers/books.controller');
const {
  getAllEvents
} = require('../controllers/events.controller');
const {
  submitPrayerRequest
} = require('../controllers/prayer.controller');
const {
  getAllSermons,
  getSermonById
} = require('../controllers/sermons.controller');
const {
  getAllTestimonies,
  submitTestimony
} = require('../controllers/testimonies.controller');
const {
  getAllGalleryItems
} = require('../controllers/gallery.controller');

// Public routes
router.get('/blogs', getAllBlogs);
router.get('/blogs/:slug', getBlogBySlug);

router.get('/books', getAllBooks);

router.get('/events', getAllEvents);

router.post('/prayer-requests', submitPrayerRequest);

router.get('/sermons', getAllSermons);
router.get('/sermons/:id', getSermonById);

router.get('/testimonies', getAllTestimonies);
router.post('/testimonies', submitTestimony);

router.get('/gallery', getAllGalleryItems);

module.exports = router;