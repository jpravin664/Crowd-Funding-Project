import React from 'react';
import { Heart, Share2, Flag, Clock, Users, Target, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Project } from '../types';
import { formatINR, convertToINR } from '../utils/currency';

interface ProjectDetailsProps {
  project: Project;
}

interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
}

interface ProjectRisk {
  title: string;
  description: string;
}

// Project-specific content
const PROJECT_CONTENT: Record<string, {
  updates: ProjectUpdate[];
  risks: ProjectRisk[];
  features: string[];
  timeline: { date: string; milestone: string }[];
}> = {
  'independent-documentary': {
    updates: [
      {
        id: '1',
        date: '2024-03-14',
        title: 'Filming Complete',
        content: 'Successfully completed filming across all five continents, capturing over 100 hours of footage with indigenous communities.'
      },
      {
        id: '2',
        date: '2024-03-08',
        title: 'Post-Production Progress',
        content: 'Initial edit is 70% complete. Early feedback from test screenings has been overwhelmingly positive.'
      }
    ],
    risks: [
      {
        title: 'Post-Production Timeline',
        description: 'Complex editing process may require additional time to properly tell each story.'
      },
      {
        title: 'Distribution Challenges',
        description: 'Securing widespread distribution while maintaining artistic integrity.'
      }
    ],
    features: [
      '4K HDR Cinematography',
      'Original Score',
      'Indigenous Language Support',
      'Interactive Web Platform',
      'Educational Resources',
      'Community Outreach Program'
    ],
    timeline: [
      { date: 'April 2024', milestone: 'Final Edit Complete' },
      { date: 'May 2024', milestone: 'Festival Submissions' },
      { date: 'June 2024', milestone: 'Premiere Events' }
    ]
  },
  'educational-vr-game': {
    updates: [
      {
        id: '1',
        date: '2024-03-15',
        title: 'Beta Testing Success',
        content: 'First round of beta testing completed with 500 students showing 40% improvement in history test scores.'
      },
      {
        id: '2',
        date: '2024-03-10',
        title: 'New Historical Scenarios',
        content: 'Added 5 new interactive historical scenarios with branching narratives.'
      }
    ],
    risks: [
      {
        title: 'Hardware Compatibility',
        description: 'Ensuring smooth performance across different VR headset models.'
      },
      {
        title: 'Educational Standards',
        description: 'Meeting varying educational requirements across different regions.'
      }
    ],
    features: [
      'Interactive Historical Events',
      'Multiplayer Mode',
      'Teacher Dashboard',
      'Progress Tracking',
      'Customizable Scenarios',
      'Educational Assessment Tools'
    ],
    timeline: [
      { date: 'April 2024', milestone: 'Content Expansion' },
      { date: 'May 2024', milestone: 'Platform Integration' },
      { date: 'June 2024', milestone: 'School Release' }
    ]
  },
  'interactive-music-experience': {
    updates: [
      {
        id: '1',
        date: '2024-03-13',
        title: 'Latency Breakthrough',
        content: 'Achieved sub-20ms latency for real-time collaboration across continents.'
      },
      {
        id: '2',
        date: '2024-03-09',
        title: 'AI Features Launch',
        content: 'Released new AI-powered harmony and arrangement suggestions.'
      }
    ],
    risks: [
      {
        title: 'Technical Infrastructure',
        description: 'Maintaining low latency across different network conditions.'
      },
      {
        title: 'User Experience',
        description: 'Balancing professional features with accessibility for all skill levels.'
      }
    ],
    features: [
      'Real-time Collaboration',
      'Virtual Studio Space',
      'AI Music Assistant',
      'Professional Audio Quality',
      'Virtual Concert Platform',
      'Integrated Learning Tools'
    ],
    timeline: [
      { date: 'April 2024', milestone: 'Platform Optimization' },
      { date: 'May 2024', milestone: 'Mobile App Launch' },
      { date: 'June 2024', milestone: 'First Virtual Concert' }
    ]
  },
  'interactive-childrens-book': {
    updates: [
      {
        id: '1',
        date: '2024-03-16',
        title: 'AR Technology Update',
        content: 'Implemented advanced AR tracking for smoother character animations and interactions.'
      },
      {
        id: '2',
        date: '2024-03-11',
        title: 'New Stories Added',
        content: 'Completed development of three new interactive stories with educational themes.'
      }
    ],
    risks: [
      {
        title: 'Device Compatibility',
        description: 'Ensuring consistent AR experience across different devices and OS versions.'
      },
      {
        title: 'Content Development',
        description: 'Maintaining high-quality content while scaling the story library.'
      }
    ],
    features: [
      'AR Integration',
      'Interactive Storytelling',
      'Educational Elements',
      'Parent Dashboard',
      'Reading Progress Tracking',
      'Multi-language Support'
    ],
    timeline: [
      { date: 'April 2024', milestone: 'Story Expansion' },
      { date: 'May 2024', milestone: 'App Store Release' },
      { date: 'June 2024', milestone: 'School Program Launch' }
    ]
  },
  'sustainable-food-market': {
    updates: [
      {
        id: '1',
        date: '2024-03-15',
        title: 'Farmer Network Growth',
        content: 'Onboarded 50 new local farmers to the platform, expanding product variety by 200%.'
      },
      {
        id: '2',
        date: '2024-03-10',
        title: 'Zero Waste Achievement',
        content: 'Implemented new composting system, achieving 99.9% waste reduction.'
      }
    ],
    risks: [
      {
        title: 'Supply Chain Management',
        description: 'Coordinating multiple small-scale farmers while maintaining consistent supply.'
      },
      {
        title: 'Perishable Inventory',
        description: 'Managing fresh produce inventory to minimize waste.'
      }
    ],
    features: [
      'Real-time Inventory',
      'Automated Ordering',
      'Waste Tracking',
      'Community Education',
      'Farmer Direct Sales',
      'Subscription Service'
    ],
    timeline: [
      { date: 'April 2024', milestone: 'Market Expansion' },
      { date: 'May 2024', milestone: 'Mobile App Launch' },
      { date: 'June 2024', milestone: 'Community Programs' }
    ]
  }
};

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const progress = (project.raised / project.goal) * 100;
  const raisedInINR = convertToINR(project.raised);
  const goalInINR = convertToINR(project.goal);
  
  const projectContent = PROJECT_CONTENT[project.id] || {
    updates: [],
    risks: [],
    features: [],
    timeline: []
  };

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

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Key Features</h3>
              <ul className="mt-4 grid grid-cols-1 gap-4">
                {projectContent.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Project Timeline</h3>
              <div className="mt-4 space-y-4">
                {projectContent.timeline.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-24 text-sm text-gray-500">
                      {item.date}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.milestone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Risks & Challenges</h3>
              <div className="mt-4 space-y-4">
                {projectContent.risks.map((risk, index) => (
                  <div key={index} className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-orange-800">{risk.title}</h4>
                        <p className="mt-1 text-sm text-orange-700">{risk.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Funding Status and Actions */}
        <div className="mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
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
                  {Math.floor(project.raised / 100)} backers
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

            {/* Project Updates */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Latest Updates</h3>
              <div className="mt-4 space-y-4">
                {projectContent.updates.map((update) => (
                  <div key={update.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{update.title}</h4>
                        <p className="mt-1 text-xs text-gray-500">{update.date}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{update.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}