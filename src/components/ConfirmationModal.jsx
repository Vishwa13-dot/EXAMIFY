import React from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

/**
 * ConfirmationModal shows prompt before submitting exam with answered vs unanswered counts.
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  answeredCount,
  unansweredCount,
  totalQuestions
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden p-6 sm:p-7 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
              <FaExclamationTriangle />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">Submit Examination?</h3>
              <p className="text-xs text-slate-500">Please review your answer progress before completing.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Breakdown Card */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between font-medium">
            <span className="flex items-center gap-2 text-slate-600">
              <FaCheckCircle className="text-emerald-500" /> Answered Questions:
            </span>
            <span className="font-bold text-slate-900">{answeredCount} / {totalQuestions}</span>
          </div>

          <div className="flex items-center justify-between font-medium">
            <span className="flex items-center gap-2 text-slate-600">
              <FaTimesCircle className="text-amber-500" /> Unanswered Questions:
            </span>
            <span className="font-bold text-slate-900">{unansweredCount} / {totalQuestions}</span>
          </div>

          {unansweredCount > 0 && (
            <p className="mt-2 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 leading-relaxed font-medium">
              ⚠️ Note: You have {unansweredCount} unanswered questions. Unanswered questions will be scored as incorrect.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel & Continue Exam
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            Submit Exam Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmationModal;
