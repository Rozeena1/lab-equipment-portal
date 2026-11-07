import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRequests = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      alert("Unauthorized Access! Student only area.");
      navigate('/login');
      return;
    }

    const fetchMyRequests = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/borrow-requests/student/${user.email}`);
        const data = await res.json();
        setMyRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student requests:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyRequests();
    }
  }, [user, navigate]);

  return (
    <div className="w-full bg-surface min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">history</span> My Borrow Requests History
            </h1>
            <p className="text-sm text-gray-500 mt-1">Showing requests submitted by: <strong className="text-indigo-600">{user?.email}</strong></p>
          </div>
          <button onClick={() => navigate('/student')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm hover:bg-indigo-100 transition-colors">
            ← Back to Catalogue
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading your history...</p>
        ) : myRequests.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">folder_open</span>
            <p className="text-gray-500 font-semibold">You haven't submitted any equipment loan requests yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
                  <th className="p-4">Equipment Title</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Request Date</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {myRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-extrabold text-indigo-600">{req.itemTitle}</td>
                    <td className="p-4 text-gray-600">{req.purpose}</td>
                    <td className="p-4 text-gray-500 text-xs">
                      {new Date(req.requestDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {req.status}
                      </span>
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

export default StudentRequests;