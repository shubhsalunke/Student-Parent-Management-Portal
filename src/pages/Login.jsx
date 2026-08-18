import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, Eye, EyeOff, RotateCcw, CheckCircle2, Info } from 'lucide-react';
import { loginUser, getCurrentUser, resetDemoData, syncAllDataFromApi } from '../data/demoData';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Redirect if already logged in and pre-sync API data
  useEffect(() => {
    syncAllDataFromApi();
    const existing = getCurrentUser();
    if (existing) {
      if (existing.role === 'admin') navigate('/admin/dashboard');
      else if (existing.role === 'student') navigate('/student/dashboard');
      else if (existing.role === 'parent') navigate('/parent/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResetSuccess(false);

    const result = await loginUser(identifier, password);
    if (result.success && result.user) {
      if (result.user.role === 'admin') navigate('/admin/dashboard');
      else if (result.user.role === 'student') navigate('/student/dashboard');
      else if (result.user.role === 'parent') navigate('/parent/dashboard');
    } else {
      setError(result.message || 'Invalid credentials. Please check your details.');
    }
  };

  const handleResetData = () => {
    resetDemoData();
    setResetSuccess(true);
    setError('');
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 relative z-10">
        {/* Header Banner */}
        <div className="bg-slate-950 p-6 text-white text-center border-b border-slate-800">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-2xl shadow-lg shadow-indigo-600/40 mb-3">
            E
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Student-Parent Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Enter your ID or Email & Password to sign in</p>
        </div>

        <div className="p-6 sm:p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold text-center space-y-1">
              <p>{error}</p>
            </div>
          )}

          {/* Reset Success Message */}
          {resetSuccess && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Demo accounts restored to default successfully!</span>
            </div>
          )}

          {/* Direct Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">User ID or Email</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter User ID or Email"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Clean Demo Info Box */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500">Demo Login Credentials</p>
              <button
                type="button"
                onClick={handleResetData}
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline"
                title="Restore default demo student & parent accounts"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo Data</span>
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600 space-y-1.5 font-mono text-left">
              <div><strong className="text-rose-600">Admin:</strong> ADMIN001 / admin@portal.com (Pass: admin123)</div>
              <div><strong className="text-indigo-600">Student:</strong> STU001 / rahul@example.com (Pass: student123)</div>
              <div><strong className="text-emerald-600">Parent:</strong> PAR001 / amit@example.com (Pass: parent123)</div>
            </div>

            <div className="flex items-start gap-1.5 text-[10px] text-slate-400 text-left px-1">
              <Info className="w-3 h-3 text-indigo-500 shrink-0 mt-0.5" />
              <span>Accounts created are saved in browser LocalStorage. Please test login in the same browser window where accounts were created.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
