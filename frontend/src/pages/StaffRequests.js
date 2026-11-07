import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffRequests = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 3500);
  };

  useEffect(() => {
    if (!user || user.role !== 'staff') {
      alert("Unauthorized Access! Staff only area.");
      navigate('/student');
    }
  }, [user, navigate]);

  const fetchRequests = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/borrow-requests');
      const data = await response.json();
      setBorrowRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleStatusUpdate = async (id, newStatus, itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/borrow-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, itemId })
      });

      if (response.ok) {
        showToast(`Successfully updated request to ${newStatus}!`, 'success');
        fetchRequests();
      } else {
        showToast("Failed to update application status.", "error");
      }
    } catch (error) {
      showToast("Server connection error occurred.", "error");
    }
  };

  return (
    <div className="w-full bg-surface min-h-screen py-10 px-4 sm:px-6 relative">
      
      {toast.message && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300 border backdrop-blur-md ${
          toast.type === 'success' ? 'bg-green-600 text-white border-green-700' : 'bg-red-600 text-white border-red-700'
        }`}>
          <span className="material-symbols-outlined text-xl">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <p className="font-bold text-sm tracking-wide">{toast.message}</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">assignment</span> Equipment Handover & Requests Queue
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage complete lifecycle from request approval to item return.</p>
          </div>
          <button onClick={() => navigate('/staff')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm hover:bg-indigo-100 transition-colors">
            ← Back to Inventory
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading requests queue...</p>
        ) : borrowRequests.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">inbox</span>
            <p className="text-gray-500 font-semibold">No equipment loan applications found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
                  <th className="p-4">Student Info</th>
                  <th className="p-4">Equipment Title</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-center">Workflow Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {borrowRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-bold text-gray-900">
                      {req.studentName}
                      <span className="block text-xs font-normal text-gray-500">{req.studentEmail}</span>
                    </td>
                    <td className="p-4 font-semibold text-indigo-600">{req.itemTitle}</td>
                    <td className="p-4 text-gray-600 max-w-xs truncate">{req.purpose}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        req.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                        req.status === 'Issued' ? 'bg-purple-100 text-purple-700' :
                        req.status === 'Returned' ? 'bg-green-100 text-green-700' :
                        req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      {req.status === 'Pending' && (
                        <>
                          <button onClick={() => handleStatusUpdate(req._id, 'Approved', req.itemId)} className="px-3 py-1.5 bg-green-600 text-white font-bold rounded-lg text-xs hover:bg-green-700 shadow-sm">
                            Approve
                          </button>
                          <button onClick={() => handleStatusUpdate(req._id, 'Rejected', req.itemId)} className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-xs hover:bg-red-700 shadow-sm">
                            Reject
                          </button>
                        </>
                      )}

                      {req.status === 'Approved' && (
                        <button onClick={() => handleStatusUpdate(req._id, 'Issued', req.itemId)} className="px-3 py-1.5 bg-purple-600 text-white font-bold rounded-lg text-xs hover:bg-purple-700 shadow-sm">
                          Issue / Handover
                        </button>
                      )}

                      {req.status === 'Issued' && (
                        <button onClick={() => handleStatusUpdate(req._id, 'Returned', req.itemId)} className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs hover:bg-emerald-700 shadow-sm">
                          Confirm Return
                        </button>
                      )}

                      {(req.status === 'Returned' || req.status === 'Rejected') && (
                        <span className="text-xs font-bold text-gray-400">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default StaffRequests;