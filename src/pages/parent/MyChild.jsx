import React, { useState, useEffect } from 'react';
import { GraduationCap, Mail, Phone, Hash, Shield, Heart } from 'lucide-react';
import { getCurrentUser, getStudentForParent } from '../../data/demoData';

export default function MyChild() {
  const authUser = getCurrentUser();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (!authUser) return;
    const child = getStudentForParent(authUser.id);
    setStudent(child);
  }, [authUser]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Connected Child Information</h1>
          <p className="text-xs text-slate-500 mt-0.5">Details of student linked to your parent account</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
          <GraduationCap className="w-5 h-5" />
        </div>
      </div>

      {student ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
          <div className="p-6 bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-emerald-600/30">
              {student.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-xs font-mono text-emerald-300">Student ID: {student.id}</p>
              <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold border border-emerald-500/30">
                Class {student.className} • Roll #{student.rollNumber}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Student Name</span>
                </div>
                <p className="font-bold text-slate-800 text-base">{student.name}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Student ID</span>
                </div>
                <p className="font-bold font-mono text-indigo-600 text-base">{student.id}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Class</span>
                </div>
                <p className="font-semibold text-slate-800">{student.className}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Hash className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Roll Number</span>
                </div>
                <p className="font-semibold text-slate-800 font-mono">{student.rollNumber}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Blood Group</span>
                </div>
                <p className="font-bold text-rose-700 text-base">{student.bloodGroup || 'O+'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Email Address</span>
                </div>
                <p className="font-semibold text-slate-800">{student.email}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Phone Number</span>
                </div>
                <p className="font-semibold text-slate-800">{student.phone}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
          <p className="text-slate-500 font-medium">No child account connected.</p>
          <p className="text-xs text-slate-400">Please contact the Administrator to link your child's student ID.</p>
        </div>
      )}
    </div>
  );
}
