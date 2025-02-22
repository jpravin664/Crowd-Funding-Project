import React from 'react';
import { Heart, Share2, Flag, Clock, Users, Target } from 'lucide-react';
import type { Project } from '../types';
import { formatINR, convertToINR } from '../utils/currency';

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const progress = (project.raised / project.goal) * 100;
  const raisedInINR = convertToINR(project.raised);
  const goalInINR = convertToINR(project.goal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left Column - Project Image and Details */}
        <div>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-900">About this project</h2>
            <div className="mt-4 prose prose-indigo">
              <p className="text-gray-500">{project.description}</p>
            </div>
          </div>
          
          {/* Project Updates */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900">Project Updates</h3>
            <div className="mt-4 space-y-4">
              {[1, 2].map((update) => (
                <div key={update} className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Update #{update}</p>
                  <h4 className="mt-1 text-lg font-medium text-gray-900">
                    Making great progress!
                  </h4>
                  <p className="mt-2 text-gray-600">
                    We're excited to share our latest developments with our amazing backers...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Funding Status and Actions */}
        <div className="mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatINR(raisedInINR)}
                </p>
                <p className="text-sm text-gray-500">
                  raised of {formatINR(goalInINR)} goal
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Heart className="h-6 w-6" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Share2 className="h-6 w-6" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Flag className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="relative w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="absolute h-full bg-indigo-600 rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex justify-center">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  {project.daysLeft} days left
                </p>
              </div>
              <div>
                <div className="flex justify-center">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  2,547 backers
                </p>
              </div>
              <div>
                <div className="flex justify-center">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  {Math.round(progress)}% funded
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Back this project
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { amount: convertToINR(25), title: "Early Bird", description: "Get the basic package" },
                { amount: convertToINR(75), title: "Premium", description: "Premium package with extras" },
                { amount: convertToINR(150), title: "Deluxe", description: "Everything plus exclusive items" }
              ].map((tier) => (
                <div key={tier.amount} className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{tier.title}</h4>
                      <p className="text-sm text-gray-500">{tier.description}</p>
                    </div>
                    <p className="text-lg font-semibold text-indigo-600">
                      {formatINR(tier.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creator Info */}
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <img
                src={project.creator.avatar}
                alt={project.creator.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {project.creator.name}
                </h3>
                <p className="text-sm text-gray-500">Project Creator</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full border border-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Contact Creator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}