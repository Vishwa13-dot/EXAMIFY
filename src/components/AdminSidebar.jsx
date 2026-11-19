import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaChartPie, 
  FaClipboardList, 
  FaBook, 
  FaQuestionCircle, 
  FaUserGraduate, 
  FaPoll, 
  FaSignOutAlt, 
  FaTimes,
  FaShieldAlt
} from 'react-icons/fa';

/**
 * AdminSidebar component for Admin Console navigation.
 */
const AdminSidebar = ({ isOpen, onClose, onLogout, currentUser }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Admin Dashboard', path: '/admin/dashboard', icon: FaChartPie },
    { label: 'Manage Exams', path: '/admin/exams', icon: FaClipboardList },
    { label: 'Manage Subjects', path: '/admin/subjects', icon: FaBook },
    { label: 'Manage Questions', path: '/admin/questions', icon: FaQuestionCircle },
    { label: 'Manage Students', path: '/admin/students', icon: FaUserGraduate },
    { label: 'Student Results', path: '/admin/results', icon: FaPoll }
  ];

  const handleLogoutClick = () => {
    if (onClose) onClose();
    onLogout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'
        }`}
      >
        {/* Top Branding */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
              <FaShieldAlt />
            </div>
            <div>
              <h2 className="font-extrabold text-white tracking-tight text-lg">Examify</h2>
              <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                Admin Console
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Management Portal</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-xs transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="text-base text-indigo-400" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/60">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/40">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser?.fullName || 'Administrator'}</p>
              <p className="text-[10px] text-indigo-400 font-semibold truncate">System Admin</p>
            </div>
          </div>

          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-rose-400 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/60 transition-colors cursor-pointer"
          >
            <FaSignOutAlt />
            <span>Admin Sign Out</span>
          </button>
        </div>

      </aside>
    </>
  );
};

export default AdminSidebar;
