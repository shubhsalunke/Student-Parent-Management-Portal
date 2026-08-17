import React, { useState, useEffect } from 'react';
import { UserCheck, Mail, Phone, GraduationCap } from 'lucide-react';
import { getCurrentUser, getParents, getStudentForParent } from '../../data/demoData';

export default function ParentProfile() {
  const authUser = getCurrentUser();
  const [parent, setParent] = useState(null);
  const [child, setChild] = useState(null);

  useEffect(() => {
    if (!authUser) return;
    const parents = getParents();
    const found = parents.find((p) => p.id === authUser.id);
    setParent(found || authUser);
    setChild(getStudentForParent(authUser.id));
  }, [authUser]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">My Parent Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">Your registered parent/guardian account information</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
          <UserCheck className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
        <div className="p-6 bg-slate-900 text-white flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-emerald-600/30">
            {parent?.name?.charAt(0) || 'P'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{parent?.name}</h2>
            <p className="text-xs font-mono text-emerald-300">Parent ID: {parent?.id}</p>
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold border border-emerald-500/30">
              Relationship: {child?.relationship || 'Parent'}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Full Name</span>
              </div>
              <p className="font-bold text-slate-800 text-base">{parent?.name}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Connected Child</span>
              </div>
              <p className="font-bold text-slate-800 text-base">{child?.name || 'None'}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Email Address</span>
              </div>
              <p className="font-semibold text-slate-800">{parent?.email}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Phone Number</span>
              </div>
              <p className="font-semibold text-slate-800">{parent?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
