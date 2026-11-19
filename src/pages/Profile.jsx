import React from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaGraduationCap, 
  FaIdCard, 
  FaBook, 
  FaAward, 
  FaShieldAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { subjects } from '../data/subjects';

/**
 * Profile page showing student academic credentials and performance overview.
 */
const Profile = ({ currentUser, userResults }) => {
  const totalPercentageSum = userResults.reduce((acc, curr) => acc + curr.percentage, 0);
  const averageScore = userResults.length > 0 ? Math.round(totalPercentageSum / userResults.length) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Profile</h2>
        <p className="text-xs text-slate-500 mt-1">Academic registration and profile performance record.</p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        
        {/* User Hero Row */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-4xl shadow-lg shadow-emerald-600/20">
            {currentUser?.fullName ? currentUser.fullName.charAt(0).toUpperCase() : 'S'}
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <FaCheckCircle className="text-emerald-600 text-xs" />
              <span>Verified Student Account</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{currentUser?.fullName}</h3>
            <p className="text-xs text-slate-500 font-medium">@{currentUser?.username} • {currentUser?.email}</p>
          </div>
        </div>

        {/* Academic Meta Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaGraduationCap className="text-emerald-600" /> Department
            </span>
            <p className="text-sm font-extrabold text-slate-900">{currentUser?.department || 'Computer Science & Engineering'}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaIdCard className="text-emerald-600" /> Roll Number
            </span>
            <p className="text-sm font-extrabold text-slate-900 font-mono">{currentUser?.rollNumber || 'CS2026042'}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaBook className="text-emerald-600" /> Semester
            </span>
            <p className="text-sm font-extrabold text-slate-900">{currentUser?.semester || '6th Semester'}</p>
          </div>

        </div>

        {/* Exam Performance Stats */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FaAward className="text-emerald-600" />
            <span>Academic Performance Record</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-center">
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Completed Tests</p>
              <p className="text-3xl font-black text-emerald-950 mt-1">{userResults.length}</p>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 text-center">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Cumulative Average</p>
              <p className="text-3xl font-black text-blue-950 mt-1">{averageScore}%</p>
            </div>

            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 text-center">
              <p className="text-xs font-bold text-purple-800 uppercase tracking-wider">Enrolled Subjects</p>
              <p className="text-3xl font-black text-purple-950 mt-1">{subjects.length}</p>
            </div>
          </div>
        </div>

        {/* Security & System Info */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-emerald-400 text-xl" />
            <div>
              <p className="font-bold">Examify Security Standards</p>
              <p className="text-[11px] text-slate-400">All assessments are monitored under single-session continuous timer control.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Profile;
