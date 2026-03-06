import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Calendar from './components/Calendar/Calendar';
import Home from './pages/Home';
import Memos from './pages/Memos';
import { EventProvider } from './context/EventContext';
import './index.css';

function App() {
  return (
    <Router>
      <EventProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/memos" element={<Memos />} />
            </Routes>
          </main>

          <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            &copy; 2026 Woody Planner | 自然、簡約、有序
          </footer>
        </div>
      </EventProvider>
    </Router>
  );
}

export default App;
