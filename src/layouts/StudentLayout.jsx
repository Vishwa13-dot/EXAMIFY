import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

/**
 * StudentLayout component wrapping all authenticated student routes.
 */
const StudentLayout = ({ currentUser, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Sidebar navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
        currentUser={currentUser}
      />

      {/* Main Body Wrapper (Offset by sidebar width on desktop) */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        <Navbar
          currentUser={currentUser}
          onLogout={onLogout}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Page View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
          <p>© 2026 Examify — Online Examination System • Academic Portal</p>
        </footer>
      </div>
    </div>
  );
};

export default StudentLayout;
