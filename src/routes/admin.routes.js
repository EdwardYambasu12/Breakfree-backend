const express = require('express');
const router = express.Router();
const noAuth = require('../middleware/noAuth.middleware'); // Use no-auth middleware

// Apply no-auth middleware
router.use(noAuth);

// Rest of your routes remain the same...
// REMOVE auth middleware for now
// const { protect, authorize } = require('../middleware/auth.middleware');

const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blog.controller');
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/books.controller');
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events.controller');
const {
  getAllPrayerRequests,
  markAsPrayed,
  deletePrayerRequest
} = require('../controllers/prayer.controller');
const {
  getAllSermons,
  createSermon,
  updateSermon,
  deleteSermon
} = require('../controllers/sermons.controller');
const {
  getAllTestimonies,
  updateTestimonyStatus,
  deleteTestimony
} = require('../controllers/testimonies.controller');
const {
  getAllGalleryItemsAdmin,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/gallery.controller');

// REMOVE auth middleware from all routes temporarily
// router.use(protect);
// router.use(authorize('admin'));

// Blog routes
router.get('/blogs', getAllBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

// Book routes
router.get('/books', getAllBooks);
router.post('/books', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

// Event routes
router.get('/events', getAllEvents);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Prayer request routes
router.get('/prayer-requests', getAllPrayerRequests);
router.put('/prayer-requests/:id/pray', markAsPrayed);
router.delete('/prayer-requests/:id', deletePrayerRequest);

// Sermon routes
router.get('/sermons', getAllSermons);
router.post('/sermons', createSermon);
router.put('/sermons/:id', updateSermon);
router.delete('/sermons/:id', deleteSermon);

// Testimony routes
router.get('/testimonies', getAllTestimonies);
router.put('/testimonies/:id/status', updateTestimonyStatus);
router.delete('/testimonies/:id', deleteTestimony);

// Gallery routes
router.get('/gallery', getAllGalleryItemsAdmin);
router.post('/gallery', createGalleryItem);
router.put('/gallery/:id', updateGalleryItem);
router.delete('/gallery/:id', deleteGalleryItem);

module.exports = router;