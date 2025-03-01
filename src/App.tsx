import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ProjectDetails } from './components/ProjectDetails';
import { CreateProject } from './components/CreateProject';
import { UserProfile } from './components/UserProfile';
import { CategoryView } from './components/CategoryView';
import { CategoriesPage } from './components/CategoriesPage';
import { Login } from './components/Login';
import { Register } from './components/Register';

// Sample data for demonstration
const SAMPLE_USER = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
};

// Sample projects by category
const CATEGORY_PROJECTS = {
  Technology: [
    {
      id: 'smart-home-assistant',
      title: 'Smart Home Assistant',
      description: 'A revolutionary AI-powered home assistant that learns your preferences and automates your daily routines.',
      imageUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80',
      goal: 100000,
      raised: 75000,
      daysLeft: 20,
      category: 'Technology',
      creator: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80'
      }
    },
    {
      id: 'eco-laptop',
      title: 'Eco-Friendly Laptop',
      description: 'A sustainable laptop made from recycled materials with exceptional performance.',
      imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80',
      goal: 200000,
      raised: 150000,
      daysLeft: 15,
      category: 'Technology',
      creator: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
      }
    }
  ],
  "Eco-friendly": [
    {
      id: 'eco-bottle',
      title: 'Eco-Friendly Water Bottle',
      description: 'A revolutionary water bottle made from biodegradable materials that naturally decompose within 5 years. Features double-wall vacuum insulation, keeping drinks cold for 24 hours or hot for 12 hours. Each bottle prevents approximately 167 single-use plastic bottles from entering our oceans annually.',
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80',
      goal: 50000,
      raised: 32500,
      daysLeft: 15,
      category: 'Eco-friendly',
      creator: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
      }
    }
  ],
  Film: [
    {
      id: 'independent-documentary',
      title: 'Independent Documentary',
      description: 'A compelling documentary exploring the impact of technology on traditional cultures, filmed across five continents. This groundbreaking film combines stunning cinematography with intimate storytelling to reveal how indigenous communities are adapting to and preserving their heritage in our digital age.',
      imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80',
      goal: 80000,
      raised: 60000,
      daysLeft: 18,
      category: 'Film',
      creator: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
      }
    }
  ],
  Games: [
    {
      id: 'educational-vr-game',
      title: 'Educational VR Game',
      description: 'An immersive virtual reality game that transforms history learning into an interactive adventure. Players can step into pivotal moments in history, make decisions that impact the narrative, and learn through hands-on experience. Features accurate historical recreations and expert-developed educational content.',
      imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80',
      goal: 120000,
      raised: 85000,
      daysLeft: 22,
      category: 'Games',
      creator: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80'
      }
    }
  ],
  Music: [
    {
      id: 'interactive-music-experience',
      title: 'Interactive Music Experience',
      description: 'A revolutionary platform that enables real-time music collaboration across the globe. Musicians can jam together, compose, and perform virtually with professional-grade audio quality. Features include AI-powered music suggestions, virtual concert spaces, and integrated music education tools.',
      imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80',
      goal: 60000,
      raised: 40000,
      daysLeft: 28,
      category: 'Music',
      creator: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
      }
    }
  ],
  Publishing: [
    {
      id: 'interactive-childrens-book',
      title: 'Interactive Children\'s Book',
      description: 'A groundbreaking series of augmented reality children\'s books that bring stories to life. Using a smartphone or tablet, children can see characters leap off the page, interact with the story, and make choices that affect the narrative. Educational elements are seamlessly integrated into the immersive experience.',
      imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80',
      goal: 40000,
      raised: 25000,
      daysLeft: 35,
      category: 'Publishing',
      creator: {
        name: 'Robert Brown',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
      }
    }
  ],
  Food: [
    {
      id: 'sustainable-food-market',
      title: 'Sustainable Food Market',
      description: 'A zero-waste marketplace connecting local farmers directly with urban communities. This innovative platform combines a physical marketplace with digital ordering, featuring real-time inventory tracking, automated composting systems, and a community education center for sustainable living practices.',
      imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80',
      goal: 90000,
      raised: 65000,
      daysLeft: 24,
      category: 'Food',
      creator: {
        name: 'Sophie Martin',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
      }
    }
  ]
};

// Get all projects from categories into a single array
const ALL_PROJECTS = Object.values(CATEGORY_PROJECTS).flat();

// Helper function to find a project by ID
function findProjectById(id: string) {
  for (const category of Object.values(CATEGORY_PROJECTS)) {
    const project = category.find(p => p.id === id);
    if (project) return project;
  }
  return null;
}

// ProjectDetailsWrapper component to handle project lookup
function ProjectDetailsWrapper() {
  const { id } = useParams();
  const project = findProjectById(id || '');

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
          <p className="mt-2 text-gray-600">The project you're looking for doesn't exist.</p>
          <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return <ProjectDetails project={project} />;
}

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Fund the Next Big</span>
                    <span className="block text-indigo-600">Innovation</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Join our community of creators and backers. Support innovative projects, 
                    bring creative ideas to life, and be part of something extraordinary.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to="/create"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Start a Project
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to="/discover"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        Explore Projects
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80"
              alt="People collaborating"
            />
          </div>
        </div>

        {/* Featured Projects */}
        <FeaturedProjects />

        {/* Categories Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Browse by Category
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Discover projects in your favorite categories
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(CATEGORY_PROJECTS).map(([category, projects]) => (
                <div
                  key={category}
                  className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={projects[0]?.imageUrl}
                      alt={category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white">{category}</h3>
                      <p className="text-sm text-gray-200 mt-1">
                        {projects.length} active projects
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="space-y-2">
                      {projects.slice(0, 2).map((project) => (
                        <Link
                          key={project.id}
                          to={`/project/${project.id}`}
                          className="block hover:bg-gray-50 rounded p-2 transition-colors duration-200"
                        >
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {project.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                            {project.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to={`/category/${category.toLowerCase()}`}
                      className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View all projects
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/project/:id" element={<ProjectDetailsWrapper />} />
            <Route path="/create" element={<CreateProject />} />
            <Route path="/categories" element={<CategoriesPage allProjects={ALL_PROJECTS} />} />
            <Route
              path="/profile"
              element={
                <UserProfile
                  user={SAMPLE_USER}
                  backedProjects={[CATEGORY_PROJECTS.Technology[0]]}
                  createdProjects={[CATEGORY_PROJECTS.Technology[0]]}
                />
              }
            />
            {Object.entries(CATEGORY_PROJECTS).map(([category, projects]) => (
              <Route
                key={category}
                path={`/category/${category.toLowerCase()}`}
                element={<CategoryView category={category} projects={projects} />}
              />
            ))}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;