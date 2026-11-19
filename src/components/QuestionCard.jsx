import React from 'react';
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

/**
 * QuestionCard component renders the current active question and answer options.
 */
const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectOption,
  onPrev,
  onNext,
  onSubmitClick
}) => {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between min-h-[460px]">
      
      <div>
        {/* Question Header & Counter Badge */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-100">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
          </div>

          <span className="text-xs text-slate-400 font-mono font-medium">
            Multiple Choice (MCQ)
          </span>
        </div>

        {/* Question Prompt */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-relaxed">
          {question.question}
        </h2>

        {/* Options List */}
        <div className="space-y-3.5">
          {question.options.map((opt, index) => {
            const isSelected = selectedAnswer === index;
            const textValue = typeof opt === 'object' ? opt.text : opt;

            return (
              <button
                key={index}
                type="button"
                onClick={() => onSelectOption(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 font-medium shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-700'
                }`}
              >
                {/* Custom radio pill */}
                <div
                  className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800'
                  }`}
                >
                  {optionLabels[index]}
                </div>

                <span className="flex-1 text-sm leading-snug">{textValue}</span>

                {isSelected && (
                  <FaCheckCircle className="text-emerald-600 text-lg flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer Controls */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
            currentIndex === 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer shadow-xs'
          }`}
        >
          <FaArrowLeft />
          <span>Previous</span>
        </button>

        {/* Submit or Next Button */}
        <div className="flex items-center gap-3">
          {currentIndex === totalQuestions - 1 ? (
            <button
              type="button"
              onClick={onSubmitClick}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer transform active:scale-98"
            >
              <span>Submit Exam</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer transform active:scale-98"
            >
              <span>Next Question</span>
              <FaArrowRight />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default QuestionCard;
