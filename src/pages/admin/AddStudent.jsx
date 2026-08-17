import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, HeartHandshake, CheckCircle2, UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';
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
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [dob, setDob] = useState('2010-01-01');
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

  const [emptyFields, setEmptyFields] = useState({});
  const [message, setMessage] = useState(null);

  const getInputStyle = (fieldName, extraClasses = '') =>
    `w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${extraClasses} ${
      emptyFields[fieldName]
        ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/40 text-rose-900 placeholder:text-rose-300 font-medium'
        : 'border-slate-200 focus:ring-indigo-500 focus:bg-white'
    }`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const missing = {};
    if (!studentName.trim()) missing.studentName = true;
    if (!studentId.trim()) missing.studentId = true;
    if (!className.trim()) missing.className = true;
    if (!rollNumber.trim()) missing.rollNumber = true;
    if (!bloodGroup.trim()) missing.bloodGroup = true;
    if (!dob.trim()) missing.dob = true;
    if (!studentEmail.trim()) missing.studentEmail = true;
    if (!studentPhone.trim()) missing.studentPhone = true;
    if (!studentPassword.trim()) missing.studentPassword = true;

    if (relationship === 'Other' && !customRelationship.trim()) missing.customRelationship = true;
    if (!parentName.trim()) missing.parentName = true;
    if (!parentId.trim()) missing.parentId = true;
    if (!parentEmail.trim()) missing.parentEmail = true;
    if (!parentPhone.trim()) missing.parentPhone = true;
    if (!parentPassword.trim()) missing.parentPassword = true;

    if (Object.keys(missing).length > 0) {
      setEmptyFields(missing);
      setMessage({
        type: 'error',
        text: 'All input boxes are mandatory! Please fill out every field before saving.'
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setEmptyFields({});

    const studentData = {
      id: studentId.trim(),
      name: studentName.trim(),
      className: className.trim(),
      rollNumber: rollNumber.trim(),
      bloodGroup: bloodGroup,
      dob: dob,
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
        <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
          message.type === 'error'
            ? 'bg-rose-50 border-rose-200 text-rose-800'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {message.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          )}
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
                onChange={(e) => {
                  setStudentName(e.target.value);
                  if (emptyFields.studentName) setEmptyFields((prev) => ({ ...prev, studentName: false }));
                }}
                placeholder="Rahul Sharma"
                className={getInputStyle('studentName')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student ID *</label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value);
                  if (emptyFields.studentId) setEmptyFields((prev) => ({ ...prev, studentId: false }));
                }}
                placeholder="STU002"
                className={getInputStyle('studentId', 'font-mono')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Class *</label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                  if (emptyFields.className) setEmptyFields((prev) => ({ ...prev, className: false }));
                }}
                placeholder="8-A"
                className={getInputStyle('className')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number *</label>
              <input
                type="text"
                required
                value={rollNumber}
                onChange={(e) => {
                  setRollNumber(e.target.value);
                  if (emptyFields.rollNumber) setEmptyFields((prev) => ({ ...prev, rollNumber: false }));
                }}
                placeholder="12"
                className={getInputStyle('rollNumber')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group *</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className={getInputStyle('bloodGroup', 'font-medium text-slate-800')}
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={getInputStyle('dob', 'font-medium text-slate-800')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={studentEmail}
                onChange={(e) => {
                  setStudentEmail(e.target.value);
                  if (emptyFields.studentEmail) setEmptyFields((prev) => ({ ...prev, studentEmail: false }));
                }}
                placeholder="rahul@example.com"
                className={getInputStyle('studentEmail')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={studentPhone}
                onChange={(e) => {
                  setStudentPhone(e.target.value);
                  if (emptyFields.studentPhone) setEmptyFields((prev) => ({ ...prev, studentPhone: false }));
                }}
                placeholder="9876543210"
                className={getInputStyle('studentPhone')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Account Password *</label>
              <div className="relative">
                <input
                  type={showStudentPassword ? 'text' : 'password'}
                  required
                  value={studentPassword}
                  onChange={(e) => {
                    setStudentPassword(e.target.value);
                    if (emptyFields.studentPassword) setEmptyFields((prev) => ({ ...prev, studentPassword: false }));
                  }}
                  placeholder="student123"
                  className={getInputStyle('studentPassword', 'pl-3.5 pr-10 font-mono')}
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
                  onChange={(e) => {
                    setCustomRelationship(e.target.value);
                    if (emptyFields.customRelationship) setEmptyFields((prev) => ({ ...prev, customRelationship: false }));
                  }}
                  placeholder="e.g. Uncle, Aunt, Brother"
                  className={getInputStyle('customRelationship')}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Name *</label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => {
                  setParentName(e.target.value);
                  if (emptyFields.parentName) setEmptyFields((prev) => ({ ...prev, parentName: false }));
                }}
                placeholder="Amit Sharma"
                className={getInputStyle('parentName')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent ID *</label>
              <input
                type="text"
                required
                value={parentId}
                onChange={(e) => {
                  setParentId(e.target.value);
                  if (emptyFields.parentId) setEmptyFields((prev) => ({ ...prev, parentId: false }));
                }}
                placeholder="PAR002"
                className={getInputStyle('parentId', 'font-mono')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Email *</label>
              <input
                type="email"
                required
                value={parentEmail}
                onChange={(e) => {
                  setParentEmail(e.target.value);
                  if (emptyFields.parentEmail) setEmptyFields((prev) => ({ ...prev, parentEmail: false }));
                }}
                placeholder="amit@example.com"
                className={getInputStyle('parentEmail')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Phone *</label>
              <input
                type="tel"
                required
                value={parentPhone}
                onChange={(e) => {
                  setParentPhone(e.target.value);
                  if (emptyFields.parentPhone) setEmptyFields((prev) => ({ ...prev, parentPhone: false }));
                }}
                placeholder="9876543211"
                className={getInputStyle('parentPhone')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Password *</label>
              <div className="relative">
                <input
                  type={showParentPassword ? 'text' : 'password'}
                  required
                  value={parentPassword}
                  onChange={(e) => {
                    setParentPassword(e.target.value);
                    if (emptyFields.parentPassword) setEmptyFields((prev) => ({ ...prev, parentPassword: false }));
                  }}
                  placeholder="parent123"
                  className={getInputStyle('parentPassword', 'pl-3.5 pr-10 font-mono')}
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
