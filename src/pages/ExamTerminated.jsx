import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaExclamationTriangle, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

/**
 * ExamTerminated page displayed when a student attempt is disqualified due to a tab/window switch.
 */
const ExamTerminated = ({ userResults, exams }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const exam = exams.find((e) => e.id === id);
  const result = userResults.find((r) => r.examId === id && r.status === 'terminated');

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
      <div className="bg-white rounded-3xl border border-rose-200 shadow-2xl max-w-lg w-full p-8 text-center space-y-6">
        
        {/* Warning Icon Hero */}
        <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-4xl mx-auto shadow-inner animate-pulse">
          <FaExclamationTriangle />
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider rounded-full border border-rose-300">
            Security Disqualification
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Examination Terminated
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            {exam ? exam.subject : 'Subject'} Examination
          </p>
        </div>

        {/* Breakdown Card */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-left text-xs space-y-3 text-slate-700">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Violation Reason:</span>
            <span className="font-extrabold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
              Tab / Window Switch Detected
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Attempt Status:</span>
            <span className="font-bold text-slate-900">Terminated — Disqualified</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Candidate Answers:</span>
            <span className="font-bold text-rose-600">Discarded (0 Recorded)</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Restart Allowed:</span>
            <span className="font-bold text-slate-900">NO (Session Blocked)</span>
          </div>
        </div>

        {/* Information Message */}
        <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-2xl text-xs text-rose-900 text-left leading-relaxed font-medium">
          <p>
            ⚠️ <strong>Academic Security Policy:</strong> In accordance with university examination guidelines, switching tabs, opening another application window, or losing page focus automatically disqualifies the test attempt. This security record has been saved and reported to the administration.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
        >
          <span>Return to Student Dashboard</span>
          <FaArrowRight />
        </button>

      </div>
    </div>
  );
};

export default ExamTerminated;
