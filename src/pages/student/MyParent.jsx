import React, { useState, useEffect } from 'react';
import { HeartHandshake, Mail, Phone, ShieldCheck, UserCheck } from 'lucide-react';
import { getCurrentUser, getParentsForStudent } from '../../data/demoData';

export default function MyParent() {
  const authUser = getCurrentUser();
  const [parentsList, setParentsList] = useState([]);

  useEffect(() => {
    if (!authUser) return;
    const list = getParentsForStudent(authUser.id);
    setParentsList(list);
  }, [authUser?.id]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">My Connected Parents & Guardians</h1>
          <p className="text-xs text-slate-500 mt-0.5">Parent account details connected to your student profile</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
          <HeartHandshake className="w-5 h-5" />
        </div>
      </div>

      {parentsList.length > 0 ? (
        <div className="space-y-6">
          {parentsList.map((parent, idx) => (
            <div key={parent.id || idx} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
              <div className="p-6 bg-gradient-to-r from-slate-900 to-purple-950 text-white flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-purple-600/30">
                  {parent.name?.charAt(0) || 'P'}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{parent.name}</h2>
                  <p className="text-xs font-mono text-purple-300">Parent ID: {parent.id}</p>
                  <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold border border-purple-500/30">
                    Relationship: {parent.relationship}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>Parent Name</span>
                    </div>
                    <p className="font-bold text-slate-800 text-base">{parent.name}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                      <span>Relationship</span>
                    </div>
                    <p className="font-bold text-slate-800 text-base">{parent.relationship}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Mail className="w-3.5 h-3.5 text-purple-600" />
                      <span>Email Address</span>
                    </div>
                    <p className="font-semibold text-slate-800">{parent.email || 'N/A'}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Phone className="w-3.5 h-3.5 text-purple-600" />
                      <span>Phone Number</span>
                    </div>
                    <p className="font-semibold text-slate-800">{parent.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
          <p className="text-slate-500 font-medium">No parent record linked yet.</p>
          <p className="text-xs text-slate-400">Please contact the Administrator to link your parent account.</p>
        </div>
      )}
    </div>
  );
}
