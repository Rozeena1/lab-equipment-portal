import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Nexbuild Resource Hub",
      desc: "Access premium lab equipment and library resources instantly."
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "24/7 Smart Lockers",
      desc: "Pick up your requested gear anytime from commuter lockers."
    },
    {
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      title: "Real-time Tracking",
      desc: "Check availability and manage your active loans seamlessly."
    }
  ];

  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-play slider logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        // Save user data and role to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect user based on their assigned role
        if (data.user.role === 'staff') {
          navigate('/staff'); // Route to staff dashboard
        } else {
          navigate('/student'); // Route to student portal
        }
      } else {
        setErrorMsg(data.message);
      }
    } catch (error) {
      setErrorMsg("Failed to connect to the server.");
    }
  };

  return (
    <div className="w-full flex justify-center py-6 sm:py-10">
      <div className="max-w-5xl w-full bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[550px] border border-surface-container">
        
        {/* Left Side: Auto Slider */}
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
          {/* Slider Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === current ? 'bg-white w-6' : 'bg-white/40'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2 font-headline">Welcome Back! 👋</h1>
            <p className="text-on-surface-variant text-sm">Enter your credentials to access the Nexbuild portal.</p>
          </div>
          
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-semibold text-center">
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">Email Address</label>
              <input 
                type="email" 
                placeholder="student@university.edu" 
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary focus:outline-none bg-surface transition-all text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary focus:outline-none bg-surface transition-all text-sm" 
              />
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-secondary rounded border-outline-variant" />
                <span className="text-sm text-on-surface-variant font-medium">Remember me</span>
              </label>
              <button type="button" className="text-sm text-secondary font-bold hover:underline">Forgot Password?</button>
            </div>
            
            <button 
              type="submit" 
              className="w-full mt-6 bg-secondary text-on-secondary font-bold py-3 rounded-lg hover:bg-secondary-container transition-colors shadow-md text-sm tracking-wide"
            >
              Login to Dashboard
            </button>
            
            {/* Register Link for navigation */}
            <p className="text-center text-sm text-on-surface-variant mt-4">
              Don't have an account? <Link to="/register" className="text-secondary font-bold hover:underline">Register here</Link>
            </p>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Login;