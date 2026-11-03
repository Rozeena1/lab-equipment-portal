import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Login = () => <h2>Login Page</h2>;
const StudentPortal = () => <h2>Student Portal (Search & Request Items)</h2>;
const StaffDashboard = () => <h2>Staff Dashboard (Manage Inventory)</h2>;

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '15px', background: '#2c3e50', color: 'white' }}>
          <h1 style={{ margin: 0 }}>Nexbuild Lab Equipment Portal</h1>
        </nav>
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/student" element={<StudentPortal />} />
            <Route path="/staff" element={<StaffDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
