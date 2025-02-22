import React from 'react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../types';

interface CategoryViewProps {
  category: string;
  projects: Project[];
}

export function CategoryView({ category, projects }: CategoryViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{category}</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
          Discover innovative {category.toLowerCase()} projects
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}