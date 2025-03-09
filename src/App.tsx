import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProjects } from './components/admin/AdminProjects';
import { AdminEvents } from './components/admin/AdminEvents';
import { CreateProject } from './components/CreateProject';
import { ProjectDetails } from './components/ProjectDetails';
import { UserProfile } from './components/UserProfile';
import { CategoriesPage } from './components/CategoriesPage';
import { FeaturedProjects } from './components/FeaturedProjects';

import 'react-toastify/dist/ReactToastify.css';

// Sample projects data
const SAMPLE_PROJECTS = [
  {
    id: 'eco-bottle',
    title: 'Eco-Friendly Water Bottle',
    description: 'A revolutionary water bottle made from biodegradable materials that naturally decompose within 5 years.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80',
    goal: 50000,
    raised: 32500,
    daysLeft: 15,
    category: 'Eco-friendly',
    creator: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'smart-garden',
    title: 'Smart Urban Garden',
    description: 'An innovative IoT-powered vertical garden system for growing fresh vegetables in your apartment.',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80',
    goal: 75000,
    raised: 45000,
    daysLeft: 20,
    category: 'Technology',
    creator: {
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'edu-vr',
    title: 'Educational VR Platform',
    description: 'A groundbreaking virtual reality platform designed to transform education through immersive experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80',
    goal: 100000,
    raised: 82000,
    daysLeft: 10,
    category: 'Education',
    creator: {
      name: 'Emily Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'art-collective',
    title: 'Community Art Collective',
    description: 'A collaborative art space bringing together local artists and the community through workshops and exhibitions.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
    goal: 25000,
    raised: 18750,
    daysLeft: 25,
    category: 'Art',
    creator: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'sustainable-fashion',
    title: 'Sustainable Fashion Line',
    description: 'Eco-conscious clothing made from recycled materials and sustainable production methods.',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    goal: 60000,
    raised: 35000,
    daysLeft: 30,
    category: 'Fashion',
    creator: {
      name: 'Sofia Martinez',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80'
    }
  }
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <ToastContainer position="top-right" />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage projects={SAMPLE_PROJECTS} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/project/:id" element={<ProjectDetails project={SAMPLE_PROJECTS[0]} />} />
              <Route path="/profile" element={<UserProfile 
                user={{
                  id: 'demo-user',
                  name: 'John Doe',
                  email: 'john@example.com',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
                }}
                backedProjects={[]}
                createdProjects={[]}
              />} />
              <Route path="/categories" element={<CategoriesPage allProjects={SAMPLE_PROJECTS} />} />
              <Route path="/featured" element={<FeaturedProjects projects={SAMPLE_PROJECTS} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;