import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, HeartHandshake, CheckCircle2, UserPlus, Eye, EyeOff } from 'lucide-react';
import { addStudentAndParent, generateNextStudentId, generateNextParentId } from '../../data/demoData';

export default function AddStudent() {
  const navigate = useNavigate();

  // Auto generate max IDs dynamically
  const defaultStudentId = generateNextStudentId();
  const defaultParentId = generateNextParentId();

  // Student Form State
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState(defaultStudentId);
  const [className, setClassName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentPassword, setStudentPassword] = useState('student123');
  const [showStudentPassword, setShowStudentPassword] = useState(false);

  // Parent Form State
  const [relationship, setRelationship] = useState('Father');
  const [customRelationship, setCustomRelationship] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentId, setParentId] = useState(defaultParentId);
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentPassword, setParentPassword] = useState('parent123');
  const [showParentPassword, setShowParentPassword] = useState(false);

  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentData = {
      id: studentId.trim(),
      name: studentName.trim(),
      className: className.trim(),
      rollNumber: rollNumber.trim(),
      email: studentEmail.trim(),
      phone: studentPhone.trim(),
      password: studentPassword.trim()
    };

    const parentData = {
      id: parentId.trim(),
      name: parentName.trim(),
      email: parentEmail.trim(),
      phone: parentPhone.trim(),
      password: parentPassword.trim()
    };

    const relationshipData = {
      relationship,
      customRelationship: relationship === 'Other' ? customRelationship.trim() : ''
    };

    addStudentAndParent(studentData, parentData, relationshipData);

    setMessage({
      type: 'success',
      text: `Successfully created Student (${studentData.name}) and Parent (${parentData.name}) accounts!`
    });

    setTimeout(() => {
      navigate('/admin/students');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Add Student & Parent Account</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Register a new student along with their linked parent/guardian details in a single form.
          </p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          <UserPlus className="w-5 h-5" />
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-semibold">{message.text}</p>
        </div>
      )}

      {/* Main Combined Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Student Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-800 text-base">Student Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name *</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student ID *</label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="STU002"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Class *</label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="8-A"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number *</label>
              <input
                type="text"
                required
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="12"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="rahul@example.com"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Account Password *</label>
              <div className="relative">
                <input
                  type={showStudentPassword ? 'text' : 'password'}
                  required
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  placeholder="student123"
                  className="w-full pl-3.5 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowStudentPassword(!showStudentPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  title={showStudentPassword ? "Hide password" : "Show password"}
                >
                  {showStudentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Parent / Guardian Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800 text-base">Parent / Guardian Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship *</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {relationship === 'Other' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Specify Relationship *</label>
                <input
                  type="text"
                  required
                  value={customRelationship}
                  onChange={(e) => setCustomRelationship(e.target.value)}
                  placeholder="e.g. Uncle, Aunt, Brother"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Name *</label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Amit Sharma"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent ID *</label>
              <input
                type="text"
                required
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                placeholder="PAR002"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Email *</label>
              <input
                type="email"
                required
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="amit@example.com"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Phone *</label>
              <input
                type="tel"
                required
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="9876543211"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Password *</label>
              <div className="relative">
                <input
                  type={showParentPassword ? 'text' : 'password'}
                  required
                  value={parentPassword}
                  onChange={(e) => setParentPassword(e.target.value)}
                  placeholder="parent123"
                  className="w-full pl-3.5 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowParentPassword(!showParentPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  title={showParentPassword ? "Hide password" : "Show password"}
                >
                  {showParentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Submission Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/students')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Student & Parent</span>
          </button>
        </div>
      </form>
    </div>
  );
}
