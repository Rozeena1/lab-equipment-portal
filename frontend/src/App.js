import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import StudentPortal from './pages/StudentPortal';
import StaffDashboard from './pages/StaffDashboard';
import Register from './pages/Register';
import StaffRequests from './pages/StaffRequests';
import StudentRequests from './pages/StudentRequests';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/staff-requests" element={<StaffRequests />} />
          <Route path="/student-requests" element={<StudentRequests />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
