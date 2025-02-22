import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { formatINR, convertToINR } from '../utils/currency';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const progress = (project.raised / project.goal) * 100;
  const raisedInINR = convertToINR(project.raised);
  const goalInINR = convertToINR(project.goal);

  return (
    <Link to={`/project/${project.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:transform group-hover:-translate-y-1">
        <div className="relative h-48">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {project.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">{project.description}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Raised</span>
              <span className="font-medium">{formatINR(raisedInINR)}</span>
            </div>
            <div className="relative w-full h-2 bg-gray-200 rounded">
              <div
                className="absolute h-full bg-indigo-600 rounded"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{Math.round(progress)}% of {formatINR(goalInINR)}</span>
              <span className="text-gray-500">{project.daysLeft} days left</span>
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <img
              src={project.creator.avatar}
              alt={project.creator.name}
              className="h-6 w-6 rounded-full"
            />
            <span className="ml-2 text-sm text-gray-500">by {project.creator.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}