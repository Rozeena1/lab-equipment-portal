import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  // Retrieve logged-in user details from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Handle user logout and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-indigo-200">science</span>
          Nexbuild Portal
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-indigo-200 text-sm font-semibold transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-base">home</span> Home
          </Link>
          
          {!user ? (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="hover:text-indigo-200 text-sm font-semibold transition-colors">Login</Link>
              <Link to="/register" className="bg-white text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-indigo-50 transition-all">
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              {/* Student Specific Links */}
              {user.role === 'student' && (
                <>
                  <Link to="/student" className="hover:text-indigo-200 text-sm font-semibold transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">inventory_2</span> Catalogue
                  </Link>
                  <Link to="/student-requests" className="hover:text-indigo-200 text-sm font-semibold transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">history</span> My Requests
                  </Link>
                </>
              )}

              {/* Staff Specific Links */}
              {user.role === 'staff' && (
                <Link to="/staff" className="hover:text-indigo-200 text-sm font-semibold transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">admin_panel_settings</span> Staff Dashboard
                </Link>
              )}

              {/* Logout Button with User Name Badge */}
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">logout</span> Logout ({user.name})
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;