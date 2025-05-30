const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const blogController = require('../controllers/blogController');

// Protected routes
router.post('/save-draft', authenticate, blogController.saveDraft);
router.post('/publish', authenticate, blogController.publishBlog);

// Public routes
router.get('/',authenticate, blogController.getAllBlogs);
router.get('/:id',authenticate, blogController.getBlogById);
router.delete('/:id',authenticate, blogController.deleteBlog);


module.exports = router;