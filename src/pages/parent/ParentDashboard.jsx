import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getCurrentUser, 
  getStudentForParent, 
  getAttendanceRecords, 
  calculateAttendancePercentage, 
  getResultRecords, 
  calculateResultStats 
} from '../../data/demoData';
import { UserCheck, GraduationCap, Calendar, Award, ArrowRight } from 'lucide-react';

export default function ParentDashboard() {
  const authUser = getCurrentUser();
  const [child, setChild] = useState(null);
  const [attendancePct, setAttendancePct] = useState(0);
  const [resultStats, setResultStats] = useState({ percentage: 0, grade: 'N/A' });

  useEffect(() => {
    if (!authUser) return;
    const childData = getStudentForParent(authUser.id);
    setChild(childData);

    if (childData) {
      const attData = getAttendanceRecords(childData.id);
      setAttendancePct(calculateAttendancePercentage(attData));

      const resData = getResultRecords(childData.id);
      setResultStats(calculateResultStats(resData));
    }
  }, [authUser]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Parent Portal</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Welcome, {authUser?.name}!</h1>
          <p className="text-sm text-slate-300 mt-1">
            Monitoring Academic Progress for <strong className="text-emerald-300">{child?.name || 'Child'}</strong> ({child?.relationship || 'Parent'})
          </p>
        </div>
        <Link
          to="/parent/child"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all shrink-0"
        >
          <GraduationCap className="w-4 h-4" />
          <span>My Child Profile</span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Child Name</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1 truncate max-w-[140px]">{child?.name || 'N/A'}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {child?.id || 'N/A'}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Class & Roll</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{child?.className || 'N/A'}</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Roll No: {child?.rollNumber || 'N/A'}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Attendance</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{attendancePct}%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">Total Attendance</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Latest Score</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{resultStats.percentage}%</h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Grade: {resultStats.grade}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/parent/child"
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">My Child Details</h3>
          <p className="text-xs text-slate-500">View complete student profile, class, roll number, and contact info.</p>
        </Link>

        <Link
          to="/parent/attendance"
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Calendar className="w-5 h-5" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Child's Attendance</h3>
          <p className="text-xs text-slate-500">Monitor your child's daily presence log and attendance percentage.</p>
        </Link>

        <Link
          to="/parent/results"
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Award className="w-5 h-5" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">Child's Academic Results</h3>
          <p className="text-xs text-slate-500">Review subject marks, percentage scores, and report cards.</p>
        </Link>
      </div>
    </div>
  );
}
