import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaPoll, FaEye, FaAward, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

/**
 * Results page listing all completed exam evaluation reports.
 */
const Results = ({ userResults }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Evaluation Results</h2>
        <p className="text-xs text-slate-500 mt-1">Review your past examination scores, percentage achievements, and detailed answers.</p>
      </div>

      {userResults.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto">
            <FaPoll />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No Exam Results Yet</h3>
            <p className="text-xs text-slate-500 mt-1">You haven't completed any examinations in the system. Start an ongoing exam from the catalog.</p>
          </div>
          <Link to="/exams" className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs">
            Browse Ongoing Exams
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Table for Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-5">Subject</th>
                  <th className="py-3.5 px-5">Submitted Date</th>
                  <th className="py-3.5 px-5 text-center">Questions</th>
                  <th className="py-3.5 px-5 text-center">Score</th>
                  <th className="py-3.5 px-5 text-center">Percentage</th>
                  <th className="py-3.5 px-5 text-center">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {userResults.map((res) => {
                  const isTerminated = res.status === 'terminated';
                  const isPassed = !isTerminated && res.percentage >= 50;

                  return (
                    <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5">
                        <span className="font-extrabold text-slate-900 block">{res.subject}</span>
                        <span className="text-[10px] font-mono text-slate-400">{res.examCode || 'EXAM'}</span>
                      </td>

                      <td className="py-4 px-5">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <FaCalendarAlt className="text-slate-400" />
                          <span>{res.submittedAt}</span>
                        </span>
                      </td>

                      <td className="py-4 px-5 text-center font-bold">{res.totalQuestions}</td>

                      <td className="py-4 px-5 text-center">
                        {isTerminated ? (
                          <span className="font-extrabold text-rose-600">—</span>
                        ) : (
                          <>
                            <span className="font-extrabold text-slate-900">{res.score}</span> / {res.totalQuestions}
                          </>
                        )}
                      </td>

                      <td className="py-4 px-5 text-center">
                        {isTerminated ? (
                          <span className="inline-block font-extrabold px-2.5 py-0.5 rounded-full text-xs bg-rose-100 text-rose-800">
                            Disqualified
                          </span>
                        ) : (
                          <span className={`inline-block font-extrabold px-2.5 py-0.5 rounded-full text-xs ${
                            isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {res.percentage}%
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-5 text-center">
                        {isTerminated ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            Terminated — Tab Switch
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                            <FaCheckCircle className="text-emerald-500 text-[10px]" /> Completed
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => navigate(isTerminated ? `/exams/${res.examId}/terminated` : `/results/${res.examId}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-colors cursor-pointer"
                        >
                          <FaEye />
                          <span>{isTerminated ? 'View Details' : 'View Result'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cards for Mobile View */}
          <div className="sm:hidden divide-y divide-slate-100">
            {userResults.map((res) => (
              <div key={res.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{res.subject}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{res.submittedAt}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {res.percentage}%
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                  <span>Score: <strong className="text-slate-900">{res.score}/{res.totalQuestions}</strong></span>
                  <span>Correct: <strong className="text-emerald-700">{res.correctCount}</strong></span>
                  <span>Wrong: <strong className="text-rose-700">{res.wrongCount}</strong></span>
                </div>

                <button
                  onClick={() => navigate(`/results/${res.examId}`)}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  <FaEye />
                  <span>View Full Result</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default Results;
