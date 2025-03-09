import express from 'express';
import Collaboration from '../models/Collaboration.js';

const router = express.Router();

// Get all collaborations
router.get('/', async (req, res) => {
  try {
    const { status, limit = 10, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build query
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    const collaborations = await Collaboration.find(query)
      .populate('createdBy', 'name avatar')
      .populate('projects', 'title imageUrl goal raised')
      .sort({ startDate: 1 })
      .limit(parseInt(limit))
      .skip(skip);
      
    const total = await Collaboration.countDocuments(query);
    
    res.json({
      collaborations,
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

// Get collaboration by ID
router.get('/:id', async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id)
      .populate('createdBy', 'name avatar')
      .populate('projects', 'title imageUrl goal raised description');
    
    if (!collaboration) {
      return res.status(404).json({ message: 'Collaboration not found' });
    }
    
    res.json(collaboration);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get active collaborations
router.get('/active', async (req, res) => {
  try {
    const now = new Date();
    
    const collaborations = await Collaboration.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
      status: 'active'
    })
    .populate('createdBy', 'name avatar')
    .populate('projects', 'title imageUrl')
    .sort({ startDate: 1 })
    .limit(5);
    
    res.json(collaborations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;