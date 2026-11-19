import React from 'react';
import { 
  FaTrophy, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaQuestionCircle, 
  FaClock, 
  FaUserCheck,
  FaFileAlt,
  FaExclamationTriangle
} from 'react-icons/fa';

/**
 * ResultCard displays summary metrics and score breakdown for a completed or terminated attempt.
 */
const ResultCard = ({ result }) => {
  const isTerminated = result.status === 'terminated';
  const isPassed = !isTerminated && result.percentage >= 50;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {result.examCode || 'EXAM EVALUATION'}
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {result.subject} Examination Result
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Submitted on {result.submittedAt}
          </p>
        </div>

        {/* Status Pill Badge */}
        <div className="flex items-center gap-3">
          {isTerminated ? (
            <span className="px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 bg-rose-100 text-rose-800 border border-rose-300">
              <FaExclamationTriangle className="text-rose-600" />
              <span>TERMINATED — TAB SWITCH</span>
            </span>
          ) : (
            <span
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 border ${
                isPassed
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border-rose-300'
              }`}
            >
              <FaTrophy className={isPassed ? 'text-emerald-600' : 'text-rose-600'} />
              <span>{isPassed ? 'PASSED' : 'NEEDS IMPROVEMENT'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className={`rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl ${
        isTerminated ? 'bg-gradient-to-br from-rose-950 to-slate-900 text-white' : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white'
      }`}>
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
            {isTerminated ? 'Evaluation Result' : 'Total Score Achieved'}
          </p>
          <div className="flex items-baseline justify-center sm:justify-start gap-2">
            <span className="text-5xl sm:text-6xl font-black tracking-tight">
              {isTerminated ? '—' : result.score}
            </span>
            <span className="text-2xl text-slate-400 font-semibold">/ {result.totalQuestions}</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {isTerminated ? 'Attempt disqualified due to tab switch' : `Passing criteria: 50% (${Math.ceil(result.totalQuestions * 0.5)} out of ${result.totalQuestions} marks)`}
          </p>
        </div>

        <div className="w-32 h-32 rounded-full border-8 border-slate-700 flex flex-col items-center justify-center bg-slate-800/80 shadow-inner">
          <span className="text-3xl font-black text-white">
            {isTerminated ? '—' : `${result.percentage}%`}
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall</span>
        </div>
      </div>

      {/* Metric Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
            <FaCheckCircle />
            <span>Correct</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-950">{isTerminated ? '—' : result.correctCount}</p>
        </div>

        <div className="bg-rose-50/80 border border-rose-200/80 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-rose-700 text-xs font-bold">
            <FaTimesCircle />
            <span>Wrong</span>
          </div>
          <p className="text-2xl font-extrabold text-rose-950">{isTerminated ? '—' : result.wrongCount}</p>
        </div>

        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold">
            <FaQuestionCircle />
            <span>Unanswered</span>
          </div>
          <p className="text-2xl font-extrabold text-amber-950">{isTerminated ? result.totalQuestions : result.unansweredCount}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
            <FaClock />
            <span>Time Spent</span>
          </div>
          <p className="text-lg font-bold text-slate-900">{isTerminated ? 'Terminated' : result.timeTakenFormatted || 'N/A'}</p>
        </div>

      </div>

      {/* Meta Information Bar */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2.5 text-xs text-slate-700">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-slate-500 font-medium">
            <FaUserCheck className="text-emerald-600" /> Student Name:
          </span>
          <span className="font-bold text-slate-900">{result.studentName}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-slate-500 font-medium">
            <FaFileAlt className="text-emerald-600" /> Submission Status:
          </span>
          <span className="font-semibold text-slate-800 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
            {result.submissionType || result.status}
          </span>
        </div>
      </div>

    </div>
  );
};

export default ResultCard;
