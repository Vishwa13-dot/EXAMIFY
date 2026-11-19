import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaGraduationCap, FaShieldAlt, FaCheckCircle, FaBookOpen } from 'react-icons/fa';

/**
 * AuthLayout renders a split-screen responsive layout for Login and Register screens.
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Header Banner */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <FaGraduationCap className="text-2xl" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Examify</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                Online Examination System
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <FaShieldAlt className="text-emerald-600" />
            <span>Secure Testing Platform</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl items-center">
          
          {/* Left Decorative/Info Side */}
          <div className="hidden lg:block lg:col-span-5 space-y-6 pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/80 text-emerald-800 rounded-full text-xs font-semibold">
              <FaBookOpen /> University Evaluation Portal
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Empowering Academic Excellence with <span className="text-emerald-600">Examify</span>
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Standardized online evaluation platform with continuous timer monitoring, subject-specific MCQ tests, instant scoring, and detailed breakdown analytics.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <FaCheckCircle className="text-emerald-500 mt-1 text-lg flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">7 Core Academic Subjects</h4>
                  <p className="text-xs text-slate-500">Java, Software Testing, ADA, Cloud Computing, Presentation Skills, Startups & E-Commerce.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                <FaCheckCircle className="text-emerald-500 mt-1 text-lg flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Real-Time Exam Control</h4>
                  <p className="text-xs text-slate-500">60-minute automated timers, question jump navigator, and immediate submission reports.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card Side */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8">
              <Outlet />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <p>© 2026 Examify — Online Examination System. All rights reserved. Built for College Academic Evaluation.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
