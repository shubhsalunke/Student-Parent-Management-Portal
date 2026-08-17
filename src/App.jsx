import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initStorage, getCurrentUser } from './data/demoData';

import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AddStudent from './pages/admin/AddStudent';
import Students from './pages/admin/Students';
import Parents from './pages/admin/Parents';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/Profile';
import StudentAttendance from './pages/student/Attendance';
import StudentResults from './pages/student/Results';
import MyParent from './pages/student/MyParent';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import MyChild from './pages/parent/MyChild';
import ParentAttendance from './pages/parent/Attendance';
import ParentResults from './pages/parent/Results';
import ParentProfile from './pages/parent/Profile';

function RootRedirect() {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'student') return <Navigate to="/student/dashboard" replace />;
  if (user.role === 'parent') return <Navigate to="/parent/dashboard" replace />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} pageTitle="Admin Portal" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/parents" element={<Parents />} />
        </Route>

        {/* Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} pageTitle="Student Portal" />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/student/results" element={<StudentResults />} />
          <Route path="/student/parent" element={<MyParent />} />
        </Route>

        {/* Parent Routes */}
        <Route element={<ProtectedRoute allowedRoles={['parent']} pageTitle="Parent Portal" />}>
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/parent/child" element={<MyChild />} />
          <Route path="/parent/attendance" element={<ParentAttendance />} />
          <Route path="/parent/results" element={<ParentResults />} />
          <Route path="/parent/profile" element={<ParentProfile />} />
        </Route>

        {/* Default Redirects */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
