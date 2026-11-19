import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaQuestionCircle, FaArrowRight, FaEye } from 'react-icons/fa';
import ExamStatusBadge from './ExamStatusBadge';

/**
 * ExamCard displays subject exam details, metadata, status badge, and action button.
 */
const ExamCard = ({ exam, attemptResult, onSelectDetails }) => {
  const navigate = useNavigate();

  const isAttempted = Boolean(attemptResult);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Header Section */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
            {exam.code}
          </span>
          <ExamStatusBadge status={isAttempted ? 'Completed' : exam.status} />
        </div>

        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
          {exam.subject}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
          {exam.description}
        </p>
      </div>

      {/* Metadata Metrics */}
      <div className="p-5 bg-slate-50/50 space-y-2.5 text-xs text-slate-600">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-500">
            <FaCalendarAlt className="text-slate-400" /> Date:
          </span>
          <span className="font-semibold text-slate-800">{exam.date}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-500">
            <FaClock className="text-slate-400" /> Schedule:
          </span>
          <span className="font-semibold text-slate-800">{exam.startTime} ({exam.duration} mins)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-500">
            <FaQuestionCircle className="text-slate-400" /> Total MCQs:
          </span>
          <span className="font-semibold text-slate-800">{exam.totalQuestions} Questions</span>
        </div>

        {/* If attempted, show score pill */}
        {isAttempted && (
          <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between font-semibold">
            <span className="text-slate-600">Scored Result:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              {attemptResult.score}/{attemptResult.totalQuestions} ({attemptResult.percentage}%)
            </span>
          </div>
        )}
      </div>

      {/* Action Footer Button */}
      <div className="p-4 bg-white border-t border-slate-100">
        {isAttempted ? (
          <button
            onClick={() => navigate(`/results/${exam.id}`)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            <FaEye className="text-slate-600" />
            <span>View Result</span>
          </button>
        ) : exam.status === 'Ongoing' ? (
          <button
            onClick={() => navigate(`/exams/${exam.id}/instructions`)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all transform active:scale-98 cursor-pointer"
          >
            <span>Start Exam</span>
            <FaArrowRight />
          </button>
        ) : exam.status === 'Upcoming' ? (
          <button
            onClick={() => onSelectDetails && onSelectDetails(exam)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs rounded-xl border border-amber-200 transition-colors cursor-pointer"
          >
            <FaEye />
            <span>View Details</span>
          </button>
        ) : (
          <button
            disabled
            className="w-full py-2.5 px-4 bg-slate-100 text-slate-400 font-semibold text-xs rounded-xl cursor-not-allowed text-center"
          >
            Expired / Closed
          </button>
        )}
      </div>

    </div>
  );
};

export default ExamCard;
