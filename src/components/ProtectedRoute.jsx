import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../data/demoData';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function ProtectedRoute({ allowedRoles, pageTitle }) {
  const location = useLocation();
  const user = getCurrentUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'student') return <Navigate to="/student/dashboard" replace />;
    if (user.role === 'parent') return <Navigate to="/parent/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar user={user} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Navbar user={user} title={pageTitle} onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
