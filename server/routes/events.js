import express from 'express';
import Event from '../models/Event.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const { category, status, limit = 10, page = 1 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (status) {
      query.status = status;
    }
    
    const events = await Event.find(query)
      .populate('organizer', 'name avatar')
      .sort({ startDate: 1 })
      .limit(parseInt(limit))
      .skip(skip);
      
    const total = await Event.countDocuments(query);
    
    res.json({
      events,
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

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name avatar')
      .populate('relatedProjects', 'title imageUrl goal raised');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register for an event
router.post('/:id/register', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is already registered
    if (event.attendees.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }
    
    // Add user to attendees
    event.attendees.push(req.user.userId);
    await event.save();
    
    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get upcoming events
router.get('/upcoming', async (req, res) => {
  try {
    const now = new Date();
    
    const events = await Event.find({
      startDate: { $gt: now },
      status: 'upcoming'
    })
    .populate('organizer', 'name avatar')
    .sort({ startDate: 1 })
    .limit(5);
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;