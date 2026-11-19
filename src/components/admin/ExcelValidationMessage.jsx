import React from 'react';
import { FaExclamationTriangle, FaTimesCircle, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

/**
 * ExcelValidationMessage component renders clear, beginner-friendly error/warning/success banners.
 */
const ExcelValidationMessage = ({ isValid, errors, countNotice, totalCount }) => {
  if (!errors && !countNotice) return null;

  return (
    <div className="space-y-3">
      {/* Success banner if valid */}
      {isValid && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-3 font-semibold shadow-xs">
          <FaCheckCircle className="text-emerald-600 text-lg flex-shrink-0" />
          <div>
            <p className="font-extrabold text-sm">{countNotice || '✓ 20 questions detected'}</p>
            <p className="text-emerald-700 font-normal">All column headers, options, and correct answers are valid. Exam is ready to create.</p>
          </div>
        </div>
      )}

      {/* Error & Warning Banners */}
      {errors && errors.length > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 font-black text-sm text-rose-800">
            <FaTimesCircle className="text-rose-600 text-base" />
            <span>Excel Validation Issues Found ({errors.length})</span>
          </div>

          <p className="text-slate-600 text-[11px]">
            Please fix the following issues in your Excel file or preview list before creating the exam:
          </p>

          <ul className="space-y-1.5 pt-1">
            {errors.map((err, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-rose-200 text-rose-800 font-medium">
                <FaExclamationCircle className="text-rose-500 mt-0.5 text-xs flex-shrink-0" />
                <span className="leading-relaxed">{err}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExcelValidationMessage;
