import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">CrowdFund</h1>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/discover" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Discover
              </Link>
              <Link to="/categories" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                Categories
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search projects..."
                />
              </div>
            </div>
            <div className="hidden md:ml-4 md:flex md:items-center">
              <Link
                to="/create"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Start a Project
              </Link>
              <Link
                to="/profile"
                className="ml-3 p-2 text-gray-400 hover:text-gray-500"
              >
                <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}