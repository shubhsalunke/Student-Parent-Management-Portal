import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Edit2, Trash2, UserPlus, X, Save, Search, CheckCircle, Copy, Check } from 'lucide-react';
import { getStudents, getParentsForStudent, updateStudent, deleteStudent } from '../../data/demoData';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  
  // Modals state
  const [viewingStudent, setViewingStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Password visibility & copy state
  const [showStudentPass, setShowStudentPass] = useState(false);
  const [showParentPass, setShowParentPass] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const loadData = () => {
    setStudents(getStudents());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingStudent) return;

    if (
      !editingStudent.name?.trim() ||
      !editingStudent.className?.trim() ||
      !editingStudent.rollNumber?.trim() ||
      !editingStudent.bloodGroup?.trim() ||
      !editingStudent.dob?.trim() ||
      !editingStudent.email?.trim() ||
      !editingStudent.phone?.trim() ||
      !editingStudent.password?.trim()
    ) {
      setToastMessage('Error: All input fields are mandatory! Please fill out every box before saving.');
      setTimeout(() => setToastMessage(''), 4000);
      return;
    }

    updateStudent(editingStudent);
    setToastMessage(`Updated ${editingStudent.name}'s information successfully.`);
    setEditingStudent(null);
    loadData();
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDeleteConfirm = () => {
    if (!deletingStudentId) return;
    deleteStudent(deletingStudentId);
    setToastMessage('Student account removed successfully.');
    setDeletingStudentId(null);
    loadData();
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">All Registered Students</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage student accounts, view profiles, and update information.</p>
        </div>
        <Link
          to="/admin/add-student"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Student</span>
        </Link>
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
          placeholder="Search by student name, ID, or class..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
        />
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Blood Group</th>
                <th className="py-3.5 px-4">Parent/Guardian Name(s)</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400 text-sm">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const parentsList = getParentsForStudent(student.id);
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-indigo-600">{student.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">{student.name}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                          {student.className}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">{student.rollNumber}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                          {student.bloodGroup || 'O+'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {parentsList.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-1.5">
                            {parentsList.map((p, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1">
                                <span>{p.name}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                                  {p.relationship}
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Not Linked</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setViewingStudent(student);
                              setShowStudentPass(false);
                              setShowParentPass(false);
                            }}
                            title="View Details"
                            className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingStudent({ ...student })}
                            title="Edit Student"
                            className="p-2 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingStudentId(student.id)}
                            title="Delete Student"
                            className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">Student Profile Details</h3>
              <button
                onClick={() => setViewingStudent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-xs text-slate-400">Student Full Name</p>
                  <p className="font-bold text-slate-800">{viewingStudent.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Student ID</p>
                  <p className="font-bold font-mono text-indigo-600">{viewingStudent.id}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Class & Roll</p>
                  <p className="font-semibold text-slate-700">Class {viewingStudent.className} (Roll #{viewingStudent.rollNumber})</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Gender</p>
                  <p className="font-semibold text-slate-700">{viewingStudent.gender || 'Male'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Blood Group</p>
                  <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                    {viewingStudent.bloodGroup || 'O+'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Date of Birth</p>
                  <p className="font-semibold text-slate-700">{viewingStudent.dob || '2001-03-18'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Birth Place</p>
                  <p className="font-semibold text-slate-700">{viewingStudent.birthPlace || 'Aurangabad'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Admission Date</p>
                  <p className="font-semibold text-slate-700">{viewingStudent.admissionDate || '2026-08-15'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="font-medium text-slate-700">{viewingStudent.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p className="font-medium text-slate-700">{viewingStudent.phone}</p>
                </div>

                {viewingStudent.address && (
                  <div className="col-span-2 pt-1">
                    <p className="text-xs text-slate-400">Address Details</p>
                    <p className="font-medium text-slate-700">
                      {viewingStudent.address}
                      {viewingStudent.city ? `, ${viewingStudent.city}` : ''}
                      {viewingStudent.state ? `, ${viewingStudent.state}` : ''}
                      {viewingStudent.pincode ? ` - ${viewingStudent.pincode}` : ''}
                    </p>
                  </div>
                )}

                {/* Account Password Field with Masking & Copy */}
                <div className="col-span-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Account Password</p>
                    <p className="font-semibold font-mono text-indigo-600 text-sm tracking-wider">
                      {showStudentPass ? (viewingStudent.password || 'student123') : '••••••••'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowStudentPass(!showStudentPass)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title={showStudentPass ? "Hide password" : "Show password"}
                    >
                      {showStudentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(viewingStudent.password || 'student123');
                        setCopiedField('student');
                        setTimeout(() => setCopiedField(null), 2000);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-1 text-xs font-semibold"
                      title="Copy password"
                    >
                      {copiedField === 'student' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'student' && <span className="text-emerald-600 text-[11px]">Copied!</span>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Connected Parents List */}
              {(() => {
                const parentsList = getParentsForStudent(viewingStudent.id);
                return (
                  <div className="p-4 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                          P
                        </div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                          Connected Parent / Guardian ({parentsList.length})
                        </p>
                      </div>
                    </div>

                    {parentsList.length > 0 ? (
                      parentsList.map((parent, pIdx) => (
                        <div key={pIdx} className="grid grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                          <div>
                            <p className="text-[11px] text-slate-400 font-medium">Guardian Name ({parent.relationship})</p>
                            <p className="font-bold text-slate-800 text-sm">{parent.name}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-400 font-medium">Parent ID</p>
                            <p className="font-bold font-mono text-emerald-700 text-sm">{parent.id}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-400 font-medium">Mobile No</p>
                            <p className="font-medium text-slate-700">{parent.phone}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-400 font-medium">Email</p>
                            <p className="font-medium text-slate-700">{parent.email || 'N/A'}</p>
                          </div>
                          {parent.address && (
                            <div className="col-span-2">
                              <p className="text-[11px] text-slate-400 font-medium">Address</p>
                              <p className="font-medium text-slate-700">{parent.address}</p>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100">No linked parent record found.</p>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveEdit} className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-lg">Edit Student ({editingStudent.id})</h3>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                <input
                  type="text"
                  required
                  value={editingStudent.className}
                  onChange={(e) => setEditingStudent({ ...editingStudent, className: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number</label>
                <input
                  type="text"
                  required
                  value={editingStudent.rollNumber}
                  onChange={(e) => setEditingStudent({ ...editingStudent, rollNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                <select
                  value={editingStudent.bloodGroup || 'O+'}
                  onChange={(e) => setEditingStudent({ ...editingStudent, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={editingStudent.dob || '2010-01-01'}
                  onChange={(e) => setEditingStudent({ ...editingStudent, dob: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={editingStudent.phone}
                  onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Account Password</label>
                <input
                  type="text"
                  required
                  value={editingStudent.password || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, password: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deletingStudentId && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-center">
            <h3 className="font-bold text-slate-800 text-lg">Confirm Deletion</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete student account <strong className="font-mono">{deletingStudentId}</strong>? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingStudentId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
