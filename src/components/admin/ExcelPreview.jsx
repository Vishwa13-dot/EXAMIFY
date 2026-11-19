import React, { useState } from 'react';
import { FaTrash, FaCheckCircle, FaList, FaTable, FaEye } from 'react-icons/fa';
import QuestionPreviewTable from './QuestionPreviewTable';

/**
 * ExcelPreview component renders scrollable cards view or compact table view of parsed Excel questions.
 */
const ExcelPreview = ({ questions, onDeleteQuestion }) => {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FaEye className="text-indigo-600" />
            <span>Question Preview ({questions.length} Questions)</span>
          </h3>
          <p className="text-xs text-slate-500">Review questions parsed from your uploaded Excel sheet before finalizing.</p>
        </div>

        {/* View Toggle Mode */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FaList />
            <span>Cards View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FaTable />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Content Rendering based on mode */}
      {viewMode === 'table' ? (
        <QuestionPreviewTable questions={questions} onDeleteQuestion={onDeleteQuestion} />
      ) : (
        <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id || idx}
              className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-3 relative group hover:border-slate-300 transition-colors"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-bold text-slate-900 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                  Question {idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => onDeleteQuestion(idx)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer text-xs"
                  title="Remove Question"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Question Prompt */}
              <p className="text-sm font-bold text-slate-900 leading-snug">{q.question}</p>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.options.map((opt) => {
                  const isCorrect = q.correctAnswer === opt.id;

                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                        isCorrect
                          ? 'bg-emerald-100/80 border-emerald-400 font-bold text-emerald-950'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{opt.id}. {opt.text}</span>
                      {isCorrect && (
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
                          <FaCheckCircle className="text-[9px]" /> Correct
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ExcelPreview;
