import React from 'react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../types';

const FEATURED_PROJECTS: Project[] = [
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
  },
  {
    id: 'smart-garden',
    title: 'Smart Urban Garden',
    description: 'An innovative IoT-powered vertical garden system that lets you grow fresh vegetables in your apartment with minimal effort. Features automated watering, LED grow lights, and a mobile app for monitoring plant health. Perfect for urban dwellers wanting to grow their own organic produce.',
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
    description: 'A groundbreaking virtual reality platform designed to transform education. Students can explore historical events, conduct virtual science experiments, and learn complex concepts through immersive 3D experiences. Already piloted in 50 schools with remarkable improvement in student engagement and learning outcomes.',
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80',
    goal: 100000,
    raised: 82000,
    daysLeft: 10,
    category: 'Education',
    creator: {
      name: 'Emily Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
    }
  }
];

export function FeaturedProjects() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover innovative projects that are changing the world
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}