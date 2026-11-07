import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Join UniBorrow Today",
    desc: "Create your student or staff account to manage equipment."
  },
  {
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    title: "Fast-Track Approvals",
    desc: "Staff can approve and issue gear seamlessly."
  }
];

const Register = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({ 
    name: '', 
    studentId: '', 
    email: '', 
    password: '', 
    role: 'student' 
  });
  
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setItemsType] = useState('success');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMessage(null);

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setItemsType('success');
        setToastMessage("Registration Successful! Redirecting to login...");
        setTimeout(() => { navigate('/'); }, 2000);
      } else {
        setItemsType('error');
        setToastMessage(data.message);
      }
    } catch (error) {
      setItemsType('error');
      setToastMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="w-full flex justify-center py-6 sm:py-10 relative">
      
      {toastMessage && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 ${
          toastType === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 'bg-red-100 border-l-4 border-red-500 text-red-700'
        }`}>
          <span className="material-symbols-outlined font-bold">
            {toastType === 'success' ? 'check_circle' : 'error'}
          </span>
          <p className="font-semibold text-sm">{toastMessage}</p>
        </div>
      )}

      <div className="max-w-5xl w-full bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse min-h-[600px] border border-surface-container">
        
        {/* Slider Section */}
        <div className="md:w-1/2 relative overflow-hidden bg-gray-900">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={slide.image} alt="Slide" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 bg-gradient-to-t from-gray-900 via-transparent to-transparent">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-headline">{slide.title}</h2>
                <p className="text-gray-300 text-sm">{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Register Form */}
        <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2 font-headline">Create Account 🎓</h1>
            <p className="text-on-surface-variant text-sm">Register as a Student or Staff member.</p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Role Selection Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">Select Role</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary focus:outline-none bg-surface transition-all text-sm font-bold text-indigo-700"
              >
                <option value="student">Student Borrower</option>
                <option value="staff">Staff Administration</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rozeena" 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary focus:outline-none bg-surface text-sm" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">ID / Staff Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. FA23-BCS-001" 
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})} 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary focus:outline-none bg-surface text-sm" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">University Email</label>
              <input 
                type="email" 
                placeholder="user@university.edu" 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary focus:outline-none bg-surface text-sm" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary focus:outline-none bg-surface text-sm" 
              />
            </div>

            <button type="submit" className="w-full mt-4 bg-secondary text-on-secondary font-bold py-3 rounded-lg hover:bg-secondary-container transition-colors shadow-md text-sm">
              Create My Account
            </button>

            <p className="text-center text-sm text-on-surface-variant mt-4">
              Already have an account? <Link to="/" className="text-secondary font-bold hover:underline">Login here</Link>
            </p>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Register;