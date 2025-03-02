import React from 'react';
import { Match } from '../types';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export const StatsOverview: React.FC<{ matches: Match[] }> = ({ matches }) => {
  const totalMatches = matches.length;
  const completedMatches = matches.filter(match => match.isCompleted).length;
  const upcomingMatches = matches.filter(match => !match.isCompleted).length;
  const todayMatches = matches.filter(match => {
    const matchDate = new Date(match.kickoff).toDateString();
    const today = new Date().toDateString();
    return matchDate === today;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatsCard 
        title="Total Matches" 
        value={totalMatches} 
        icon={<span className="text-white text-xl">📊</span>}
        color="bg-blue-500"
      />
      <StatsCard 
        title="Today's Matches" 
        value={todayMatches} 
        icon={<span className="text-white text-xl">📅</span>}
        color="bg-green-500"
      />
      <StatsCard 
        title="Upcoming Matches" 
        value={upcomingMatches} 
        icon={<span className="text-white text-xl">⏳</span>}
        color="bg-yellow-500"
      />
      <StatsCard 
        title="Completed Matches" 
        value={completedMatches} 
        icon={<span className="text-white text-xl">✅</span>}
        color="bg-purple-500"
      />
    </div>
  );
};

export default StatsCard;