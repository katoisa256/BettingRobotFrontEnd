import { Match } from '../types';
import MatchCard from './MatchCard';
import React, { useState } from 'react';

interface MatchesGridProps {
  matches: Match[];
  loading: boolean;
}

const MatchesGrid: React.FC<MatchesGridProps> = ({ matches, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [dateFilter, setDateFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  const itemsPerPage = 10;

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchDate = new Date(match.kickoff);
    const filterDate = dateFilter ? new Date(dateFilter) : null;
    const matchesDate = !dateFilter || 
      matchDate.toISOString().split('T')[0] === filterDate?.toISOString().split('T')[0];
    
    const matchTime = matchDate.toTimeString().split(' ')[0].substring(0, 5);
    const matchesTime = !timeFilter || matchTime === timeFilter;

    return matchesSearch && matchesDate && matchesTime;
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const aTime = new Date(a.kickoff).getTime();
    const bTime = new Date(b.kickoff).getTime();
    return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
  });

  const totalPages = Math.ceil(sortedMatches.length / itemsPerPage);
  const paginatedMatches = sortedMatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-4">
        <input
          type="text"
          placeholder="Search teams..."
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="date"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
        <input
          type="time"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={timeFilter}
          onChange={(e) => {
            setTimeFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">Sort by date (earliest first)</option>
          <option value="desc">Sort by date (latest first)</option>
        </select>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No matches found</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MatchesGrid;