import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaMinus, FaTimes, FaFileAlt } from 'react-icons/fa';
import ResultCard from '../components/ResultCard';
import { questionsData } from '../data/questions';

/**
 * Result page showing overall attempt metrics and full answer review mode.
 */
const Result = ({ userResults, currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isAnswersModalOpen, setIsAnswersModalOpen] = useState(false);

  // Find result for this exam
  const result = userResults.find((r) => r.examId === id || r.id === id);

  if (!result) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 max-w-md mx-auto">
        <FaFileAlt className="text-3xl text-slate-300 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Result Record Not Found</h3>
        <p className="text-xs text-slate-500">No submission record exists for this examination attempt.</p>
        <Link to="/dashboard" className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const questions = questionsData[result.subjectId] || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Evaluation Report ID: #{result.id.slice(-6)}
        </span>
      </div>

      {/* Main Result Metric Card */}
      <ResultCard result={result} />

      {/* Footer Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Question Answer Key Review</h4>
          <p className="text-xs text-slate-500">Inspect correct answers and your selected responses for all 20 questions.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAnswersModalOpen(true)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            View Detailed Answers
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* View Answers Detailed Modal */}
      {isAnswersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-lg font-black text-slate-900">{result.subject} — Answer Key</h3>
                <p className="text-xs text-slate-500">Reviewing answers for Candidate: {result.studentName}</p>
              </div>
              <button
                onClick={() => setIsAnswersModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Questions List Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {questions.map((q, index) => {
                const userChoice = result.userAnswers[index];
                const isUnanswered = userChoice === undefined || userChoice === null;
                const isCorrect = !isUnanswered && userChoice === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : isUnanswered
                        ? 'bg-amber-50/40 border-amber-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="text-xs font-bold text-slate-900">
                        Question {index + 1} of 20
                      </span>

                      {/* Status Tag */}
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <FaCheckCircle className="text-emerald-600" />
                          <span>✓ Correct</span>
                        </span>
                      ) : isUnanswered ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <FaMinus className="text-amber-600" />
                          <span>— Not Attempted</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                          <FaTimesCircle className="text-rose-600" />
                          <span>✗ Incorrect</span>
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-bold text-slate-900 mb-4">{q.question}</p>

                    {/* Options list showing student pick & correct answer */}
                    <div className="space-y-2 text-xs">
                      {q.options.map((optText, optIdx) => {
                        const isStudentPick = userChoice === optIdx;
                        const isCorrectOption = q.correctAnswer === optIdx;

                        let style = 'bg-white text-slate-700 border-slate-200';

                        if (isCorrectOption) {
                          style = 'bg-emerald-100 font-bold text-emerald-950 border-emerald-400 ring-1 ring-emerald-400';
                        } else if (isStudentPick && !isCorrectOption) {
                          style = 'bg-rose-100 font-bold text-rose-950 border-rose-400 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border flex items-center justify-between ${style}`}
                          >
                            <span>{String.fromCharCode(65 + optIdx)}. {optText}</span>
                            {isCorrectOption && (
                              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded">
                                Correct Answer
                              </span>
                            )}
                            {isStudentPick && !isCorrectOption && (
                              <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-200/80 px-2 py-0.5 rounded">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setIsAnswersModalOpen(false)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Answer Key
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Result;
