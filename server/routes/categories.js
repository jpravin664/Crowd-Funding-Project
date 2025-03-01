import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Get all categories with project counts
router.get('/', async (req, res) => {
  try {
    const categories = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json(categories.map(cat => ({
      name: cat._id,
      count: cat.count
    })));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured projects for each category
router.get('/featured', async (req, res) => {
  try {
    const categories = await Project.aggregate([
      { $group: { _id: '$category' } }
    ]);
    
    const featuredProjects = {};
    
    // For each category, get the top 3 projects by funding percentage
    for (const category of categories) {
      const projects = await Project.find({ category: category._id })
        .sort({ raised: -1 })
        .limit(3)
        .populate('creator', 'name avatar');
        
      featuredProjects[category._id] = projects;
    }
    
    res.json(featuredProjects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;