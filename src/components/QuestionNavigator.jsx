import React from 'react';

/**
 * QuestionNavigator component renders a 1 to 20 grid allowing direct jump to any question.
 * State color codes:
 * - Active: Highlighted outline ring
 * - Answered: Green background
 * - Unanswered: Neutral light gray background
 */
const QuestionNavigator = ({
  totalQuestions,
  currentIndex,
  answers,
  onSelectQuestion,
  onSubmitClick
}) => {
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
      
      {/* Navigator Title & Metrics */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight mb-1">Question Palette</h3>
        <p className="text-xs text-slate-500">Jump directly to any question number below.</p>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600 border-t border-b border-slate-100 py-3">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 inline-block"></span>
            <span>Answered ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-slate-200 inline-block border border-slate-300"></span>
            <span>Unanswered ({unansweredCount})</span>
          </div>
          <div className="flex items-center gap-2 col-span-2 mt-1">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 border-2 border-emerald-600 inline-block"></span>
            <span>Current Active</span>
          </div>
        </div>
      </div>

      {/* Dynamic Questions Grid */}
      <div className="grid grid-cols-5 gap-2 sm:gap-2.5 max-h-[360px] overflow-y-auto pr-1">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isCurrent = currentIndex === index;
          const isAnswered = answers[index] !== undefined && answers[index] !== null;

          let btnStyles = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200';

          if (isAnswered) {
            btnStyles = 'bg-emerald-600 text-white font-bold border border-emerald-700 shadow-xs';
          }

          if (isCurrent) {
            btnStyles += ' ring-3 ring-emerald-500 ring-offset-2 scale-105 z-10';
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectQuestion(index)}
              className={`w-full h-10 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${btnStyles}`}
              title={`Jump to Question ${index + 1}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Direct Submit Exam Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSubmitClick}
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer text-center"
        >
          Submit Examination
        </button>
      </div>

    </div>
  );
};

export default QuestionNavigator;
