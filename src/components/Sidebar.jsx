import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  UserCheck, 
  User, 
  Calendar, 
  Award, 
  HeartHandshake, 
  GraduationCap, 
  LogOut 
} from 'lucide-react';
import { logoutUser } from '../data/demoData';

export default function Sidebar({ user, isMobileOpen, setIsMobileOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const adminNav = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Add Student', path: '/admin/add-student', icon: UserPlus },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Parents', path: '/admin/parents', icon: UserCheck },
  ];

  const studentNav = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Attendance', path: '/student/attendance', icon: Calendar },
    { label: 'Results', path: '/student/results', icon: Award },
    { label: 'My Parent', path: '/student/parent', icon: HeartHandshake },
  ];

  const parentNav = [
    { label: 'Dashboard', path: '/parent/dashboard', icon: LayoutDashboard },
    { label: 'My Child', path: '/parent/child', icon: GraduationCap },
    { label: 'Attendance', path: '/parent/attendance', icon: Calendar },
    { label: 'Results', path: '/parent/results', icon: Award },
    { label: 'Profile', path: '/parent/profile', icon: User },
  ];

  let navItems = [];
  let roleBadge = '';
  let roleColor = '';

  if (user?.role === 'admin') {
    navItems = adminNav;
    roleBadge = 'Admin Console';
    roleColor = 'bg-rose-500/10 text-rose-600 border-rose-200';
  } else if (user?.role === 'student') {
    navItems = studentNav;
    roleBadge = 'Student Portal';
    roleColor = 'bg-indigo-500/10 text-indigo-600 border-indigo-200';
  } else if (user?.role === 'parent') {
    navItems = parentNav;
    roleBadge = 'Parent Portal';
    roleColor = 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top Section */}
        <div>
          {/* App Header */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 font-bold text-xl">
              Edu
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight leading-tight">EduConnect</h1>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${roleColor}`}>
                {roleBadge}
              </span>
            </div>
          </div>

          {/* User Info Snippet */}
          <div className="p-4 mx-3 my-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <p className="text-xs text-slate-400 font-medium">Logged in as</p>
            <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-400 capitalize font-mono mt-0.5">ID: {user?.id}</p>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'}
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout Action */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white font-medium text-sm transition-all duration-200 border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
