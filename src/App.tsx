import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SystemStatus from './components/SystemStatus';
import Dashboard from './pages/Dashboard';
import UpcomingMatches from './pages/UpcomingMatches';
import TodaysMatches from './pages/TodaysMatches';
import CompletedMatches from './pages/CompletedMatches';
import AIAnalysis from './pages/AIAnalysis';
import Predictions from './pages/Predictions';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upcoming" element={<UpcomingMatches />} />
            <Route path="/today" element={<TodaysMatches />} />
            <Route path="/completed" element={<CompletedMatches />} />
            <Route path="/analysis" element={<AIAnalysis />} />
            <Route path="/predictions" element={<Predictions />} />
          </Routes>
        </main>
        
        <Footer />
        <SystemStatus />
      </div>
    </Router>
  );
}

export default App