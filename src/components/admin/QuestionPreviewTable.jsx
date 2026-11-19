import React from 'react';
import { FaTrash } from 'react-icons/fa';

/**
 * QuestionPreviewTable renders a compact responsive table of parsed questions.
 */
const QuestionPreviewTable = ({ questions, onDeleteQuestion }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4 min-w-[220px]">Question Prompt</th>
              <th className="py-3 px-4 min-w-[120px]">Option A</th>
              <th className="py-3 px-4 min-w-[120px]">Option B</th>
              <th className="py-3 px-4 min-w-[120px]">Option C</th>
              <th className="py-3 px-4 min-w-[120px]">Option D</th>
              <th className="py-3 px-4 text-center w-24">Correct</th>
              <th className="py-3 px-4 text-right w-16">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {questions.map((q, idx) => (
              <tr key={q.id || idx} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-center font-bold text-slate-900">{idx + 1}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{q.question}</td>
                <td className="py-3 px-4 text-slate-600">{q.options[0]?.text || q.rawOptions[0]}</td>
                <td className="py-3 px-4 text-slate-600">{q.options[1]?.text || q.rawOptions[1]}</td>
                <td className="py-3 px-4 text-slate-600">{q.options[2]?.text || q.rawOptions[2]}</td>
                <td className="py-3 px-4 text-slate-600">{q.options[3]?.text || q.rawOptions[3]}</td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold rounded-md text-xs">
                    {q.correctAnswer}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onDeleteQuestion(idx)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove Question"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionPreviewTable;
