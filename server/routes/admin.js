import express from 'express';
import Project from '../models/Project.js';
import Event from '../models/Event.js';
import Collaboration from '../models/Collaboration.js';
import User from '../models/User.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes in this file require admin authentication
router.use(verifyToken, isAdmin);

// Get admin dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalCollaborations = await Collaboration.countDocuments();
    
    const totalFunding = await Project.aggregate([
      { $group: { _id: null, total: { $sum: '$raised' } } }
    ]);
    
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('creator', 'name avatar');
      
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');
    
    res.json({
      counts: {
        projects: totalProjects,
        users: totalUsers,
        events: totalEvents,
        collaborations: totalCollaborations,
        funding: totalFunding[0]?.total || 0
      },
      recent: {
        projects: recentProjects,
        users: recentUsers
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Project management
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('creator', 'name avatar')
      .sort({ createdAt: -1 });
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const { title, description, category, goal, deadline, imageUrl, status } = req.body;
    
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (category) project.category = category;
    if (goal) project.goal = goal;
    if (deadline) project.deadline = deadline;
    if (imageUrl) project.imageUrl = imageUrl;
    if (status) project.status = status;
    
    await project.save();
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Remove project from creator's createdProjects
    await User.findByIdAndUpdate(
      project.creator,
      { $pull: { createdProjects: project._id } }
    );
    
    // Remove project from backers' backedProjects
    for (const backer of project.backers) {
      await User.findByIdAndUpdate(
        backer.user,
        { $pull: { backedProjects: project._id } }
      );
    }
    
    await Project.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Event management
router.post('/events', async (req, res) => {
  try {
    const { 
      title, description, startDate, endDate, location, 
      imageUrl, category, isVirtual, registrationLink, relatedProjects 
    } = req.body;
    
    const event = new Event({
      title,
      description,
      startDate,
      endDate,
      location,
      imageUrl,
      category,
      isVirtual,
      registrationLink,
      relatedProjects,
      organizer: req.user.userId
    });
    
    await event.save();
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/events', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'name avatar')
      .sort({ startDate: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/events/:id', async (req, res) => {
  try {
    const { 
      title, description, startDate, endDate, location, 
      imageUrl, category, isVirtual, registrationLink, status, relatedProjects 
    } = req.body;
    
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Update fields
    if (title) event.title = title;
    if (description) event.description = description;
    if (startDate) event.startDate = startDate;
    if (endDate) event.endDate = endDate;
    if (location) event.location = location;
    if (imageUrl) event.imageUrl = imageUrl;
    if (category) event.category = category;
    if (isVirtual !== undefined) event.isVirtual = isVirtual;
    if (registrationLink) event.registrationLink = registrationLink;
    if (status) event.status = status;
    if (relatedProjects) event.relatedProjects = relatedProjects;
    
    await event.save();
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Collaboration management
router.post('/collaborations', async (req, res) => {
  try {
    const { 
      title, description, startDate, endDate, imageUrl, 
      partners, projects 
    } = req.body;
    
    const collaboration = new Collaboration({
      title,
      description,
      startDate,
      endDate,
      imageUrl,
      partners,
      projects,
      createdBy: req.user.userId
    });
    
    await collaboration.save();
    
    res.status(201).json(collaboration);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/collaborations', async (req, res) => {
  try {
    const collaborations = await Collaboration.find()
      .populate('createdBy', 'name avatar')
      .populate('projects', 'title imageUrl')
      .sort({ startDate: 1 });
    
    res.json(collaborations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/collaborations/:id', async (req, res) => {
  try {
    const { 
      title, description, startDate, endDate, imageUrl, 
      partners, projects, status 
    } = req.body;
    
    const collaboration = await Collaboration.findById(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ message: 'Collaboration not found' });
    }
    
    // Update fields
    if (title) collaboration.title = title;
    if (description) collaboration.description = description;
    if (startDate) collaboration.startDate = startDate;
    if (endDate) collaboration.endDate = endDate;
    if (imageUrl) collaboration.imageUrl = imageUrl;
    if (partners) collaboration.partners = partners;
    if (projects) collaboration.projects = projects;
    if (status) collaboration.status = status;
    
    await collaboration.save();
    
    res.json(collaboration);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/collaborations/:id', async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id);
    
    if (!collaboration) {
      return res.status(404).json({ message: 'Collaboration not found' });
    }
    
    await Collaboration.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Collaboration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;