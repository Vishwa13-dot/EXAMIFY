import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaGraduationCap, FaBars, FaBell, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

/**
 * Top Navbar component showing page title, user info, notification indicator, and mobile menu toggle.
 */
const Navbar = ({ currentUser, onLogout, onToggleSidebar }) => {
  const location = useLocation();

  // Helper to derive page title from current route path
  const getPageTitle = (pathname) => {
    if (pathname.includes('/dashboard')) return 'Student Dashboard';
    if (pathname.includes('/exams') && pathname.includes('/instructions')) return 'Exam Instructions';
    if (pathname.includes('/exams')) return 'Examinations Catalog';
    if (pathname.includes('/results/')) return 'Exam Evaluation Report';
    if (pathname.includes('/results')) return 'My Results & Scorecards';
    if (pathname.includes('/profile')) return 'Student Profile';
    return 'Examify System';
  };

  const title = getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
            aria-label="Toggle menu"
          >
            <FaBars className="text-xl" />
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex w-9 h-9 rounded-lg bg-emerald-600 text-white items-center justify-center font-bold text-lg shadow-sm">
              <FaGraduationCap />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">{title}</h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Academic Year 2026 • Term II</p>
            </div>
          </div>
        </div>

        {/* Right: Notifications & Profile Pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification Button */}
          <button className="relative p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors">
            <FaBell className="text-lg" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-6 w-px bg-slate-200"></div>

          {/* Student Profile Pill */}
          <div className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100/80 p-1.5 pr-3 rounded-full border border-slate-200 transition-colors">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              {currentUser?.fullName ? currentUser.fullName.charAt(0).toUpperCase() : <FaUserCircle />}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-900 leading-tight">{currentUser?.fullName || 'Student'}</p>
              <p className="text-[10px] text-slate-500 font-medium">@{currentUser?.username || 'user'}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200/80 transition-all cursor-pointer"
            title="Sign out of Examify"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
