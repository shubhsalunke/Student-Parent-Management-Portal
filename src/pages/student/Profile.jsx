import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, GraduationCap, Hash, Heart } from 'lucide-react';
import { getCurrentUser, getStudents } from '../../data/demoData';

export default function Profile() {
  const authUser = getCurrentUser();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (!authUser) return;
    const students = getStudents();
    const found = students.find((s) => s.id === authUser.id);
    setStudent(found || authUser);
  }, [authUser]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">My Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">Your student account personal information</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          <User className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
        <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-indigo-600/40">
            {student?.name?.charAt(0) || 'S'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{student?.name}</h2>
            <p className="text-xs font-mono text-indigo-300">ID: {student?.id}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-medium border border-indigo-500/30">
              Class {student?.className} • Roll No {student?.rollNumber}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                <span>Class & Division</span>
              </div>
              <p className="font-bold text-slate-800 text-base">{student?.className || 'N/A'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                <span>Roll Number</span>
              </div>
              <p className="font-bold text-slate-800 text-base font-mono">{student?.rollNumber || 'N/A'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Blood Group</span>
              </div>
              <p className="font-bold text-rose-700 text-base">{student?.bloodGroup || 'O+'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>Email Address</span>
              </div>
              <p className="font-semibold text-slate-800">{student?.email || 'N/A'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Phone className="w-3.5 h-3.5 text-indigo-500" />
                <span>Phone Number</span>
              </div>
              <p className="font-semibold text-slate-800">{student?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
