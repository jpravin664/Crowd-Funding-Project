import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import categoryRoutes from './routes/categories.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with updated options
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/categories', categoryRoutes);

// Basic test route
app.get('/api/test', verifyToken, (req, res) => {
  res.json({ message: 'Protected route works!' });
});

// Stats route
app.get('/api/stats', async (req, res) => {
  try {
    const totalProjects = await mongoose.models.Project.countDocuments();
    const totalUsers = await mongoose.models.User.countDocuments();
    const totalFunding = await mongoose.models.Project.aggregate([
      { $group: { _id: null, total: { $sum: '$raised' } } }
    ]);
    
    res.json({
      totalProjects,
      totalUsers,
      totalFunding: totalFunding[0]?.total || 0,
      activeProjects: await mongoose.models.Project.countDocuments({ 
        deadline: { $gt: new Date() } 
      })
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search route
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const projects = await mongoose.models.Project.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    })
    .populate('creator', 'name avatar')
    .limit(10);
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});