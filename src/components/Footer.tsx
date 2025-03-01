import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-600">CrowdFund</h3>
            <p className="text-gray-500 text-sm">
              Empowering creators and innovators to bring their ideas to life through community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {['How it Works', 'Browse Projects', 'Start a Project', 'Success Stories'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-500 hover:text-gray-900 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              {['Help Center', 'Guidelines', 'Terms of Use', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-500 hover:text-gray-900 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-500 text-sm">
                <Mail className="h-5 w-5 mr-2" />
                support@crowdfund.com
              </li>
              <li className="flex items-center text-gray-500 text-sm">
                <Phone className="h-5 w-5 mr-2" />
                +91 (800) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} CrowdFund. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}