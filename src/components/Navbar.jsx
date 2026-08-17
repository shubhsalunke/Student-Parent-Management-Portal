import React from 'react';
import { Menu, LogOut, ShieldCheck, GraduationCap, UserCheck } from 'lucide-react';
import { logoutUser } from '../data/demoData';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user, onMenuClick, title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const getRoleIcon = () => {
    if (user?.role === 'admin') return <ShieldCheck className="w-4 h-4 text-rose-500" />;
    if (user?.role === 'student') return <GraduationCap className="w-4 h-4 text-indigo-500" />;
    return <UserCheck className="w-4 h-4 text-emerald-500" />;
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title || 'Dashboard'}</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
          {getRoleIcon()}
          <span>{user?.name}</span>
          <span className="text-slate-400">|</span>
          <span className="uppercase text-[10px] tracking-wider text-slate-500 font-bold">{user?.role}</span>
        </div>

        <button
          onClick={handleLogout}
          title="Logout"
          className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
