import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import { EventProvider } from './context/EventContext';
import './App.css';

const App = () => {
  return (
    <EventProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Calendar />} />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
};

export default App;
