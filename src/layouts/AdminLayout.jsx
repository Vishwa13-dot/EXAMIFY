import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FaBars, FaShieldAlt, FaBell, FaSignOutAlt } from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar';

/**
 * AdminLayout component wrapping all authenticated Admin Console routes.
 */
const AdminLayout = ({ currentUser, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const getAdminTitle = (path) => {
    if (path.includes('/admin/dashboard')) return 'System Administration Overview';
    if (path.includes('/admin/exams')) return 'Examinations Control Center';
    if (path.includes('/admin/subjects')) return 'Subject Curriculum Directory';
    if (path.includes('/admin/questions')) return 'Question Bank Management';
    if (path.includes('/admin/students')) return 'Student Directory & Accounts';
    if (path.includes('/admin/results')) return 'Master Evaluation Scorecards';
    return 'Admin Control Panel';
  };

  const title = getAdminTitle(location.pathname);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Admin Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
        currentUser={currentUser}
      />

      {/* Main Body Wrapper */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
              >
                <FaBars className="text-lg" />
              </button>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex w-9 h-9 rounded-lg bg-indigo-600 text-white items-center justify-center font-bold text-lg shadow-sm">
                  <FaShieldAlt />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900 leading-tight">{title}</h1>
                  <p className="text-[11px] text-indigo-600 font-semibold hidden sm:block">Examify Academic Control Hub</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-200">
                Administrator Mode
              </span>

              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors cursor-pointer"
              >
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
          <p>© 2026 Examify — Online Examination System • University Administration Control Cell</p>
        </footer>

      </div>
    </div>
  );
};

export default AdminLayout;
