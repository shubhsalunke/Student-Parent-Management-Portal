import React, { useState, useEffect } from 'react';
import { Search, UserCheck, Phone, Mail, Trash2, CheckCircle } from 'lucide-react';
import { getParents, getStudentForParent, deleteParent } from '../../data/demoData';

export default function Parents() {
  const [parents, setParents] = useState([]);
  const [search, setSearch] = useState('');
  const [deletingParentId, setDeletingParentId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadData = () => {
    setParents(getParents());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteConfirm = () => {
    if (!deletingParentId) return;
    deleteParent(deletingParentId);
    setToastMessage('Parent account removed successfully.');
    setDeletingParentId(null);
    loadData();
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredParents = parents.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Parents & Guardians Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">List of all registered parents and their linked students.</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
          <UserCheck className="w-5 h-5" />
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-sm font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by parent name, ID, or email..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
        />
      </div>

      {/* Parents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Parent ID</th>
                <th className="py-3.5 px-4">Parent Name</th>
                <th className="py-3.5 px-4">Relationship</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredParents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400 text-sm">
                    No parent accounts found.
                  </td>
                </tr>
              ) : (
                filteredParents.map((parent) => {
                  const studentInfo = getStudentForParent(parent.id);
                  return (
                    <tr key={parent.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-emerald-600">{parent.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">{parent.name}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                          {studentInfo ? studentInfo.relationship : 'Guardian'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {studentInfo ? (
                          <div>
                            <span className="font-semibold text-slate-800">{studentInfo.name}</span>
                            <span className="text-xs text-slate-400 ml-2">({studentInfo.className})</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Not Linked</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{parent.phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{parent.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setDeletingParentId(parent.id)}
                          title="Delete Parent Account"
                          className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {deletingParentId && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-center">
            <h3 className="font-bold text-slate-800 text-lg">Confirm Deletion</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete parent account <strong className="font-mono">{deletingParentId}</strong>?
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingParentId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl"
              >
                Delete Parent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
