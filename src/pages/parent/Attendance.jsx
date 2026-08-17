import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { getCurrentUser, getStudentForParent, getAttendanceRecords, calculateAttendancePercentage } from '../../data/demoData';

export default function ParentAttendance() {
  const authUser = getCurrentUser();
  const [child, setChild] = useState(null);
  const [records, setRecords] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!authUser) return;
    const childData = getStudentForParent(authUser.id);
    setChild(childData);

    if (childData) {
      const data = getAttendanceRecords(childData.id);
      setRecords(data);
      setPercentage(calculateAttendancePercentage(data));
    }
  }, [authUser?.id]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Child's Attendance Report</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Attendance log for <strong className="text-slate-800">{child?.name || 'Child'}</strong> ({child?.className})
          </p>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {percentage}%
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Attendance</p>
            <p className="text-xs text-emerald-600 font-medium">Overall Standing</p>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Attendance Log</span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            Total Sessions: {records.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {records.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-6 font-medium text-slate-800">{item.date}</td>
                  <td className="py-3.5 px-6 text-right">
                    {item.status === 'Present' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                        Absent
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
