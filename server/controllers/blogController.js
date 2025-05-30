const Blog = require('../models/Blog');
const mongoose = require('mongoose');

// Helper function to process tags consistently
const processTags = (tagsInput) => {
  if (!tagsInput) return [];
  if (Array.isArray(tagsInput)) return tagsInput.filter(tag => tag.trim());
  if (typeof tagsInput === 'string') {
    return tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
  }
  return [];
};

// Get all blogs for the authenticated user
exports.getAllBlogs = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: 'User identification missing' });
    }

    const blogs = await Blog.find({ user: req.user.id })
      .sort({ updated_at: -1 })
      .select('-user');
    
    res.status(200).json(blogs || []);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ 
      error: 'Server error while fetching blogs',
      details: error.message 
    });
  }
};

// Save or update a draft
exports.saveDraft = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const processedTags = processTags(tags);

    let blog;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findOneAndUpdate(
        { _id: id, user: userId },
        { 
          title, 
          content, 
          tags: processedTags,
          status: 'draft',
          updated_at: Date.now() 
        },
        { new: true }
      );

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found or unauthorized' });
      }
    } else {
      blog = new Blog({
        title,
        content,
        tags: processedTags,
        status: 'draft',
        user: userId
      });
      await blog.save();
    }

    res.status(200).json({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      tags: blog.tags,
      status: blog.status,
      created_at: blog.created_at,
      updated_at: blog.updated_at
    });
  } catch (error) {
    console.error('Error saving draft:', error);
    res.status(500).json({ 
      error: 'Server error while saving draft',
      details: error.message 
    });
  }
};

// Publish a blog
exports.publishBlog = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const processedTags = processTags(tags);

    let blog;
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findOneAndUpdate(
        { _id: id, user: userId },
        { 
          title, 
          content, 
          tags: processedTags,
          status: 'published',
          updated_at: Date.now() 
        },
        { new: true }
      );

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found or unauthorized' });
      }
    } else {
      blog = new Blog({
        title,
        content,
        tags: processedTags,
        status: 'published',
        user: userId
      });
      await blog.save();
    }

    res.status(200).json({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      tags: blog.tags,
      status: blog.status,
      created_at: blog.created_at,
      updated_at: blog.updated_at
    });
  } catch (error) {
    console.error('Error publishing blog:', error);
    res.status(500).json({ 
      error: 'Server error while publishing blog',
      details: error.message 
    });
  }
};


// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    // Validate blog ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        error: 'Invalid blog ID format',
        details: `Received: ${req.params.id}`
      });
    }

    // Debug: Log the deletion attempt
    console.log(`Attempting to delete blog ${req.params.id} for user ${req.user.id}`);

    const blog = await Blog.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!blog) {
      return res.status(404).json({ 
        error: 'Blog not found or unauthorized',
        details: `Blog ${req.params.id} not found for user ${req.user.id}`
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Blog deleted successfully',
      deletedBlog: {
        id: blog._id,
        title: blog.title,
        status: blog.status
      }
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ 
      error: 'Server error while deleting blog',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
  // Get single blog by ID (only if owned by user)
exports.getBlogById = async (req, res) => {
  try {
    // Validate blog ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        error: 'Invalid blog ID format',
        details: `Received: ${req.params.id}`
      });
    }

    // Debug: Log the user ID and blog ID being requested
    console.log(`Fetching blog ${req.params.id} for user ${req.user.id}`);

    const blog = await Blog.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    }).select('-user'); // Exclude user field from response

    if (!blog) {
      return res.status(404).json({ 
        error: 'Blog not found or unauthorized',
        details: `Blog ${req.params.id} not found for user ${req.user.id}`
      });
    }

    res.status(200).json({
      id: blog._id,
      title: blog.title,
      content: blog.content,
      tags: blog.tags,
      status: blog.status,
      created_at: blog.created_at,
      updated_at: blog.updated_at
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ 
      error: 'Server error while fetching blog',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};