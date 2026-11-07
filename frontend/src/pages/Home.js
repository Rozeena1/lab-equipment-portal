import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Welcome to Nexbuild",
      subtitle: "Empowering Commuter Learners with Premium Tools"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Advanced Lab Equipment",
      subtitle: "Borrow microscopes, oscilloscopes, and fieldwork gear instantly."
    },
    {
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "24/7 Smart Locker Access",
      subtitle: "Reserve online and pick up at your own convenience."
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col pb-20">
      
      {/* 1. Full-Bleed Hero Slider (Breaks out of layout padding) */}
      <div className="relative w-[100vw] h-[550px] sm:h-[650px] left-1/2 -translate-x-1/2 -mt-8 sm:-mt-10 overflow-hidden shadow-2xl rounded-b-[40px]">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
          >
            {/* Stunning Gradient Fallback (Agar image load na ho toh yeh chale ga) */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-900"></div>
            
            {/* Image with Overlay Blend */}
            <img src={slide.image} alt="Hero Slide" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
            
            {/* Glassmorphism Content Area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-12 rounded-3xl shadow-2xl max-w-4xl transform transition-all duration-700 hover:scale-[1.02]">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md">
                  {slide.subtitle}
                </p>
                
                {/* Modern Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/login" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-1 text-lg">
                    Login to Portal
                  </Link>
                  <Link to="/register" className="px-8 py-4 bg-white/10 text-white border-2 border-white/50 font-bold rounded-full hover:bg-white hover:text-indigo-900 transition-all shadow-lg transform hover:-translate-y-1 text-lg backdrop-blur-sm">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
          {heroSlides.map((_, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrent(idx)}
              className={`h-3 rounded-full cursor-pointer transition-all duration-300 shadow-md ${idx === current ? 'bg-white w-10' : 'bg-white/40 w-3 hover:bg-white/70'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* 2. Attractive Features Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-extrabold tracking-widest uppercase text-sm mb-3 block">Why Choose Nexbuild?</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Dedicated to Commuter Learners</h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed">
            Our platform bridges the gap for university students who commute. We provide a seamless, accountable way to browse, request, and borrow high-end library and lab equipment without the hassle of long queues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 text-center group">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-4xl">precision_manufacturing</span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Premium Equipment</h3>
            <p className="text-gray-500 leading-relaxed">
              Access real-time catalogues for digital oscilloscopes, microscopes, fieldwork cameras, and engineering toolkits.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 text-center group">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-rotate-6 transition-transform">
              <span className="material-symbols-outlined text-4xl">lock_clock</span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Smart Lockers</h3>
            <p className="text-gray-500 leading-relaxed">
              No need to rush during office hours. Pick up your approved equipment from our 24/7 automated lockers via SMS PIN.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 text-center group">
            <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-4xl">rule</span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Strict Accountability</h3>
            <p className="text-gray-500 leading-relaxed">
              A transparent system tracking active loans, due dates, and item conditions to prevent double-booking and ensure safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;