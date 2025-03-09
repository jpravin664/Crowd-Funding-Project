import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, DollarSign, Award, Zap } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../types';

interface LandingPageProps {
  projects: Project[];
}

export function LandingPage({ projects }: LandingPageProps) {
  const featuredProjects = projects.slice(0, 3); // Show first 3 projects as featured

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&q=80"
            alt="People collaborating"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            CrowdFund
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            The platform where innovative ideas meet passionate backers. Fund projects that matter, 
            support creators, and be part of the next big thing.
          </p>
          <div className="mt-10">
            <Link
              to="/categories"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
            >
              Explore Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover innovative projects making waves in our community
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
              Why Choose CrowdFund
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Empowering Creators and Backers
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Users className="h-8 w-8 text-indigo-600" />,
                  title: 'Global Community',
                  description: 'Connect with backers and creators from around the world.',
                },
                {
                  icon: <DollarSign className="h-8 w-8 text-indigo-600" />,
                  title: 'Secure Funding',
                  description: 'Safe and transparent funding process for all projects.',
                },
                {
                  icon: <Award className="h-8 w-8 text-indigo-600" />,
                  title: 'Quality Projects',
                  description: 'Curated selection of innovative and impactful projects.',
                },
                {
                  icon: <Zap className="h-8 w-8 text-indigo-600" />,
                  title: 'Fast Launch',
                  description: 'Get your project up and running quickly with our streamlined process.',
                },
              ].map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}