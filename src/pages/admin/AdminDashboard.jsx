import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, UserPlus, HeartHandshake, ArrowRight, ShieldCheck } from 'lucide-react';
import { getStudents, getParents, getRelationships } from '../../data/demoData';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [relationships, setRelationships] = useState([]);

  useEffect(() => {
    setStudents(getStudents());
    setParents(getParents());
    setRelationships(getRelationships());
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-2 border border-rose-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Portal</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Admin Overview & Control</h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Create students & parents, manage active accounts, and monitor student-parent family connections.
          </p>
        </div>
        <Link
          to="/admin/add-student"
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Student</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Students */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Students</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{students.length}</h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Enrolled & Active</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Total Parents */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Parents</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{parents.length}</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">Registered Guardians</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Total Relationships */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Family Links</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{relationships.length}</h3>
            <p className="text-xs text-purple-600 font-medium mt-1">Connected Parent-Student</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
            <HeartHandshake className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-lg">Student Directory</h3>
            <Link to="/admin/students" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            View, edit, or remove student profiles and check connected guardian relationships.
          </p>
          <div className="divide-y divide-slate-100">
            {students.slice(0, 3).map((stu) => (
              <div key={stu.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{stu.name}</p>
                  <p className="text-xs text-slate-400">Class {stu.className} • Roll #{stu.rollNumber}</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-semibold">
                  {stu.id}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-lg">Parent Directory</h3>
            <Link to="/admin/parents" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Monitor registered parents and their linked children accounts across classes.
          </p>
          <div className="divide-y divide-slate-100">
            {parents.slice(0, 3).map((par) => (
              <div key={par.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{par.name}</p>
                  <p className="text-xs text-slate-400">{par.email}</p>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md font-semibold">
                  {par.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
