import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaClipboardList, 
  FaPoll, 
  FaUser, 
  FaSignOutAlt, 
  FaTimes,
  FaGraduationCap,
  FaCheckCircle
} from 'react-icons/fa';

/**
 * Sidebar Component: Desktop fixed sidebar & Mobile responsive collapsible drawer.
 */
const Sidebar = ({ isOpen, onClose, onLogout, currentUser }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: FaHome },
    { label: 'Exams', path: '/exams', icon: FaClipboardList },
    { label: 'Results', path: '/results', icon: FaPoll },
    { label: 'Profile', path: '/profile', icon: FaUser }
  ];

  const handleLogoutClick = () => {
    if (onClose) onClose();
    onLogout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'
        }`}
      >
        {/* Top Header branding inside sidebar */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-600/20">
              <FaGraduationCap />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 tracking-tight text-lg">Examify</h2>
              <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Exam System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Main Navigation</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs border border-emerald-200/60'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="text-lg" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* User Card & Logout Button at Bottom */}
        <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              {currentUser?.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.fullName || 'Student'}</p>
              <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                <FaCheckCircle className="text-emerald-500 text-[10px]" /> Authenticated
              </p>
            </div>
          </div>

          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-rose-600 bg-rose-50/80 hover:bg-rose-100 border border-rose-200/60 transition-colors cursor-pointer"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
