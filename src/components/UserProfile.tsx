import React from 'react';
import { Settings, Edit3, Heart, Bookmark, Gift } from 'lucide-react';
import type { Project, User } from '../types';

interface UserProfileProps {
  user: User;
  backedProjects: Project[];
  createdProjects: Project[];
}

export function UserProfile({ user, backedProjects, createdProjects }: UserProfileProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="relative px-6 pb-6">
          <div className="flex items-center">
            <div className="-mt-16">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-full ring-4 ring-white"
              />
            </div>
            <div className="ml-6 -mt-6">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="ml-auto -mt-6 flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Gift, label: 'Projects Created', value: createdProjects.length },
          { icon: Heart, label: 'Projects Backed', value: backedProjects.length },
          { icon: Bookmark, label: 'Projects Saved', value: 12 },
          { icon: Gift, label: 'Total Contributed', value: '$2,450' },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Tabs */}
      <div className="mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['Created Projects', 'Backed Projects', 'Saved Projects'].map((tab, index) => (
              <button
                key={index}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${index === 0
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Project Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {createdProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-4">
                  <div className="relative w-full h-2 bg-gray-200 rounded">
                    <div
                      className="absolute h-full bg-indigo-600 rounded"
                      style={{
                        width: `${Math.min((project.raised / project.goal) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>${project.raised.toLocaleString()} raised</span>
                    <span>{project.daysLeft} days left</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}