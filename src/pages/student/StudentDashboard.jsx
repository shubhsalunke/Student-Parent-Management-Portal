import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Calendar, Award, HeartHandshake, User, ArrowRight } from 'lucide-react';
import { 
  getCurrentUser, 
  getStudents, 
  getAttendanceRecords, 
  calculateAttendancePercentage, 
  getResultRecords, 
  calculateResultStats,
  getParentForStudent 
} from '../../data/demoData';

export default function StudentDashboard() {
  const authUser = getCurrentUser();
  const [studentDetails, setStudentDetails] = useState(null);
  const [attendancePct, setAttendancePct] = useState(0);
  const [resultStats, setResultStats] = useState({ percentage: 0, grade: 'N/A' });
  const [parentInfo, setParentInfo] = useState(null);

  useEffect(() => {
    if (!authUser) return;
    const students = getStudents();
    const curr = students.find((s) => s.id === authUser.id);
    setStudentDetails(curr || authUser);

    const attRecords = getAttendanceRecords(authUser.id);
    setAttendancePct(calculateAttendancePercentage(attRecords));

    const resRecords = getResultRecords(authUser.id);
    setResultStats(calculateResultStats(resRecords));

    setParentInfo(getParentForStudent(authUser.id));
  }, [authUser]);

  return (
    <div className="space-y-6">
      {/* Student Welcome Header Card */}
      <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Academic Portal</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Welcome back, {studentDetails?.name || authUser?.name}!
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Class: <strong className="text-white">{studentDetails?.className || 'N/A'}</strong> • Roll No: <strong className="text-white">{studentDetails?.rollNumber || 'N/A'}</strong> • ID: <strong className="font-mono text-indigo-300">{authUser?.id}</strong>
          </p>
        </div>
        <Link
          to="/student/profile"
          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl backdrop-blur-xs border border-white/20 flex items-center gap-2 transition-all shrink-0"
        >
          <User className="w-4 h-4" />
          <span>My Profile</span>
        </Link>
      </div>

      {/* Quick Overview Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Attendance Percentage */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Attendance</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{attendancePct}%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">Overall Attendance</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Latest Result Percentage */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Academic Score</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{resultStats.percentage}%</h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Grade: {resultStats.grade}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Class Info */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Class & Section</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{studentDetails?.className || 'N/A'}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Roll No: {studentDetails?.rollNumber || 'N/A'}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Linked Parent */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Linked Parent</p>
            <h3 className="text-lg font-bold text-slate-900 mt-1 truncate max-w-[120px]">
              {parentInfo?.name || 'N/A'}
            </h3>
            <p className="text-xs text-purple-600 font-medium mt-1">{parentInfo?.relationship || 'Guardian'}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
            <HeartHandshake className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Navigation Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/student/attendance"
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Calendar className="w-5 h-5" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Attendance Records</h3>
          <p className="text-xs text-slate-500">View daily presence/absence records and overall attendance statistics.</p>
        </Link>

        <Link
          to="/student/results"
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Award className="w-5 h-5" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Academic Results</h3>
          <p className="text-xs text-slate-500">Check subject-wise test marks, total percentage, and final grade report.</p>
        </Link>

        <Link
          to="/student/parent"
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">My Parent Information</h3>
          <p className="text-xs text-slate-500">View linked parent/guardian contact details, ID, and relationship.</p>
        </Link>
      </div>
    </div>
  );
}
