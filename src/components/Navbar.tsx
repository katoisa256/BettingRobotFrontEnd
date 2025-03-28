import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Calendar, CheckCircle, Clock, Home, Brain, LineChart } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <BarChart3 className="h-6 w-6" />
              <span>BettingDashboard</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/')}`}
              >
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </div>
              </Link>
              
              <Link 
                to="/upcoming" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/upcoming')}`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Upcoming</span>
                </div>
              </Link>
              
              <Link 
                to="/today" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/today')}`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Today</span>
                </div>
              </Link>
              
              <Link 
                to="/completed" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/completed')}`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              </Link>
              
              <Link 
                to="/analysis" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/analysis')}`}
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>Analysis</span>
                </div>
              </Link>

              <Link 
                to="/predictions" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/predictions')}`}
              >
                <div className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <span>Predictions</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden border-t border-blue-700">
        <div className="grid grid-cols-6 text-center">
          <Link 
            to="/" 
            className={`py-3 ${isActive('/')}`}
          >
            <Home className="h-5 w-5 mx-auto" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link 
            to="/upcoming" 
            className={`py-3 ${isActive('/upcoming')}`}
          >
            <Clock className="h-5 w-5 mx-auto" />
            <span className="text-xs">Upcoming</span>
          </Link>
          
          <Link 
            to="/today" 
            className={`py-3 ${isActive('/today')}`}
          >
            <Calendar className="h-5 w-5 mx-auto" />
            <span className="text-xs">Today</span>
          </Link>
          
          <Link 
            to="/completed" 
            className={`py-3 ${isActive('/completed')}`}
          >
            <CheckCircle className="h-5 w-5 mx-auto" />
            <span className="text-xs">Completed</span>
          </Link>
          
          <Link 
            to="/analysis" 
            className={`py-3 ${isActive('/analysis')}`}
          >
            <Brain className="h-5 w-5 mx-auto" />
            <span className="text-xs">Analysis</span>
          </Link>

          <Link 
            to="/predictions" 
            className={`py-3 ${isActive('/predictions')}`}
          >
            <LineChart className="h-5 w-5 mx-auto" />
            <span className="text-xs">Predictions</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;