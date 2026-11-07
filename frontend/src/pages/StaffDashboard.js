import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'staff') {
      alert("Unauthorized Access! Staff only area.");
      navigate('/student');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    title: '',
    itemCode: '',
    department: 'Engineering',
    condition: 'Mint',
    status: 'In Stock',
    imageUrl: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMsgType('success');
        setMessage("Equipment successfully added to MongoDB!");
        setFormData({ title: '', itemCode: '', department: 'Engineering', condition: 'Mint', status: 'In Stock', imageUrl: '' });
      } else {
        setMsgType('error');
        setMessage(data.message || "Failed to add item.");
      }
    } catch (error) {
      setMsgType('error');
      setMessage("Server connection failed.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full bg-surface min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="bg-indigo-600 px-8 py-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold font-headline">Staff Administration Dashboard 🛠️</h1>
            <p className="text-indigo-100 mt-1 text-sm">Manage inventory items and catalogue.</p>
          </div>
          <Link to="/staff-requests" className="px-4 py-2.5 bg-white text-indigo-700 font-extrabold rounded-xl text-sm shadow-md hover:bg-indigo-50 transition-colors">
            View Loan Requests →
          </Link>
        </div>

        {message && (
          <div className={`mx-8 mt-6 px-4 py-3 rounded-lg flex items-center gap-3 font-semibold text-sm ${msgType === 'success' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-red-100 text-red-700 border-l-4 border-red-500'}`}>
            <span className="material-symbols-outlined">{msgType === 'success' ? 'check_circle' : 'error'}</span>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Add New Equipment to Catalogue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Equipment Title</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Leica Microscope" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Item Code (Unique)</label>
              <input type="text" required value={formData.itemCode} onChange={(e) => setFormData({...formData, itemCode: e.target.value})} placeholder="e.g. BIO-MIC-001" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
              <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option value="Engineering">Electrical Engineering</option>
                <option value="Chemistry">Chemistry & Bio</option>
                <option value="Physics">Applied Physics</option>
                <option value="Media">Media & Arts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Condition</label>
              <select value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option value="Mint">Mint (Like New)</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair (Needs slight repair)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Availability Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Maintenance">Under Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Equipment Picture</label>
              <input type="file" accept="image/*" required onChange={handleImageUpload} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-50 file:text-indigo-700 cursor-pointer" />
            </div>
          </div>

          {formData.imageUrl && (
            <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center">
              <span className="text-xs font-bold text-gray-500 mb-2">IMAGE PREVIEW</span>
              <img src={formData.imageUrl} alt="Preview" className="h-40 rounded-lg shadow-sm object-cover" />
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 text-white font-extrabold text-lg rounded-xl hover:bg-indigo-700 shadow-lg transition-all flex justify-center items-center gap-2">
            {loading ? 'Saving to Database...' : <><span className="material-symbols-outlined">save</span> Add Equipment</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffDashboard;