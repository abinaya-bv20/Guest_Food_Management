import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';


import Home from './components/Home';
import RequestFood from './components/RequestFood';
import MessDashboard from './components/MessDashboard';
import OfficeDashboard from './components/OfficeDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route path="/request-food" element={<RequestFood />} />
          <Route path="/mess-dashboard" element={<MessDashboard />} />
          <Route path="/office-dashboard" element={<OfficeDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
