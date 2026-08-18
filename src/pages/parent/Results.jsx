import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { getCurrentUser, getStudentForParent, getResultRecords, calculateResultStats } from '../../data/demoData';

export default function ParentResults() {
  const authUser = getCurrentUser();
  const [child, setChild] = useState(null);
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({ totalMarks: 0, totalMax: 0, percentage: 0, grade: 'N/A' });

  useEffect(() => {
    if (!authUser) return;
    const childData = getStudentForParent(authUser.id);
    setChild(childData);

    if (childData) {
      const data = getResultRecords(childData.id);
      setResults(data);
      setStats(calculateResultStats(data));
    }
  }, [authUser?.id]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Child's Academic Performance</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Marks report for <strong className="text-slate-800">{child?.name || 'Child'}</strong> ({child?.className})
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-sm">
            {stats.grade}
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider">Overall Grade</p>
            <p className="text-xs text-emerald-700 font-bold">
              Percentage: {stats.percentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Subject Marks Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Subject Marks Breakdown</span>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600">
            Total Score: {stats.totalMarks} / {stats.totalMax}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Subject</th>
                <th className="py-3 px-6 text-right">Marks Obtained</th>
                <th className="py-3 px-6 text-right">Maximum Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {results.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {item.subject}
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono font-bold text-emerald-600">{item.marks}</td>
                  <td className="py-3.5 px-6 text-right font-mono text-slate-500">{item.maxMarks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t border-slate-200 font-bold text-slate-800 text-sm">
                <td className="py-3.5 px-6">Total Percentage</td>
                <td colSpan="2" className="py-3.5 px-6 text-right text-emerald-700 font-mono text-base">
                  {stats.percentage}% (Grade {stats.grade})
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
