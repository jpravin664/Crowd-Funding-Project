import express from 'express';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, limit = 10, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build query
    const query = {};
    
    // Add category filter if provided
    if (category) {
      query.category = category;
    }
    
    // Add search filter if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Determine sort order
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'popular') {
      sortOption = { backers: -1 };
    } else if (sort === 'funded') {
      sortOption = { raised: -1 };
    } else if (sort === 'deadline') {
      sortOption = { deadline: 1 }; // Closest deadline first
    }
    
    const projects = await Project.find(query)
      .populate('creator', 'name avatar')
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip);
      
    const total = await Project.countDocuments(query);
    
    res.json({
      projects,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('creator', 'name avatar')
      .populate('backers.user', 'name avatar');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, category, goal, deadline, imageUrl } = req.body;

    const project = new Project({
      title,
      description,
      category,
      goal,
      deadline,
      imageUrl,
      creator: req.user.userId
    });

    await project.save();
    
    // Add project to user's created projects
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { createdProjects: project._id } }
    );

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, category, goal, deadline, imageUrl } = req.body;
    
    // Find project
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user is the creator
    if (project.creator.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }
    
    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (category) project.category = category;
    if (goal) project.goal = goal;
    if (deadline) project.deadline = deadline;
    if (imageUrl) project.imageUrl = imageUrl;
    
    await project.save();
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    // Find project
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Check if user is the creator
    if (project.creator.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }
    
    // Delete project
    await Project.findByIdAndDelete(req.params.id);
    
    // Remove project from user's created projects
    await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { createdProjects: req.params.id } }
    );
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Back a project
router.post('/:id/back', verifyToken, async (req, res) => {
  try {
    const { amount } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Add backer to project
    project.backers.push({
      user: req.user.userId,
      amount
    });
    
    // Update raised amount
    project.raised += amount;

    await project.save();
    
    // Add project to user's backed projects
    await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { backedProjects: req.params.id } }
    );

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get project backers
router.get('/:id/backers', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('backers.user', 'name avatar');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project.backers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get projects by category
router.get('/category/:category', async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const projects = await Project.find({ category: req.params.category })
      .populate('creator', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
      
    const total = await Project.countDocuments({ category: req.params.category });
    
    res.json({
      projects,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get trending projects
router.get('/trending', async (req, res) => {
  try {
    // Get projects with most backers in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const projects = await Project.find({
      'backers.date': { $gte: sevenDaysAgo }
    })
    .populate('creator', 'name avatar')
    .sort({ 'backers.length': -1 })
    .limit(5);
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;