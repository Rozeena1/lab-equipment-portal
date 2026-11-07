import React, { useState, useEffect } from 'react';

const StudentPortal = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modal and Toast States
  const [selectedItem, setSelectedItem] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 3500);
  };

  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Student', email: 'student@university.edu' };

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/items');
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/borrow-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: selectedItem._id,
          itemTitle: selectedItem.title,
          studentName: user.name,
          studentEmail: user.email,
          purpose: purpose
        })
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Loan request submitted successfully! Staff will review it.", "success");
        setSelectedItem(null);
        setPurpose('');
      } else {
        showToast(data.message || "Failed to submit request.", "error");
      }
    } catch (error) {
      showToast("Server connection error. Make sure backend is running.", "error");
    }
    setSubmitting(false);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-surface min-h-screen pb-10 relative">
      
      
      {toast.message && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300 border backdrop-blur-md ${
          toast.type === 'success' 
            ? 'bg-green-600 text-white border-green-700' 
            : 'bg-red-600 text-white border-red-700'
        }`}>
          <span className="material-symbols-outlined text-xl">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <p className="font-bold text-sm tracking-wide">{toast.message}</p>
        </div>
      )}

      {/* Header */}
      <section className="w-full px-6 py-8 bg-surface-container-lowest shadow-sm border-b border-surface-container">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-sm text-secondary font-bold uppercase tracking-wider">Campus Asset Registry</span>
            <h1 className="text-3xl md:text-4xl text-primary font-extrabold tracking-tight mt-1">Equipment Catalogue</h1>
          </div>
          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
            Logged in as: <strong className="text-indigo-600">{user.name}</strong>
          </span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-6 py-8">
        
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:max-w-md">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input 
              type="text" 
              placeholder="Search equipment..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            {['All', 'In Stock', 'Out of Stock', 'Maintenance'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
                  filterStatus === status ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="text-gray-500 font-semibold text-center mt-10">Loading catalogue...</p>}

        {/* Catalogue Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item._id} className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden group">
              <div className="w-full h-48 bg-gray-50 relative overflow-hidden">
                <img src={item.imageUrl || "https://via.placeholder.com/300"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">{item.itemCode}</span>
                  <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{item.condition}</span>
                </div>
                
                <h3 className="text-lg text-gray-900 font-extrabold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.department} Dept.</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button 
                    disabled={item.status !== 'In Stock'}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      item.status === 'In Stock' 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">outgoing_mail</span>
                    {item.status === 'In Stock' ? 'Request Loan' : 'Not Available'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Popup */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Request Equipment Loan</h2>
            <p className="text-sm text-gray-500 mb-6">You are requesting: <strong className="text-indigo-600">{selectedItem.title}</strong></p>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Your Name & Email</label>
                <input type="text" disabled value={`${user.name} (${user.email})`} className="w-full px-4 py-2.5 rounded-xl border bg-gray-100 text-sm text-gray-600 font-semibold" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Purpose of Borrowing / Lab Task</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="e.g. Required for Final Year Project data collection..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                ></textarea>
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setSelectedItem(null)} className="w-1/2 py-3 rounded-xl border border-gray-300 font-bold text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={submitting} className="w-1/2 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md">
                  {submitting ? 'Submitting...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentPortal;