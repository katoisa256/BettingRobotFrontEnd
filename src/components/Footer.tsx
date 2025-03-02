import React from 'react';
import { BarChart3, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BarChart3 className="h-6 w-6 mr-2" />
            <span className="font-bold text-xl">BettingDashboard</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} BettingDashboard. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-end mt-2">
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;