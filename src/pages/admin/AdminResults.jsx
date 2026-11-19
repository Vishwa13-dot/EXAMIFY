import React, { useState } from 'react';
import { FaPoll, FaEye, FaSearch, FaTimes, FaCheckCircle, FaTimesCircle, FaMinus } from 'react-icons/fa';
import ResultCard from '../../components/ResultCard';
import { questionsData } from '../../data/questions';

/**
 * AdminResults page for viewing all student evaluation scorecards and detailed answers across the system.
 */
const AdminResults = ({ userResults, subjects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedResult, setSelectedResult] = useState(null);
  const [isAnswersOpen, setIsAnswersOpen] = useState(false);

  const filteredResults = userResults.filter((res) => {
    const matchesSearch =
      res.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (res.examCode && res.examCode.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSubject = selectedSubject === 'ALL' || res.subjectId === selectedSubject;

    return matchesSearch && matchesSubject;
  });

  const handleInspectResult = (res) => {
    setSelectedResult(res);
    setIsAnswersOpen(false);
  };

  const currentQuestions = selectedResult ? questionsData[selectedResult.subjectId] || [] : [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Master Student Results</h2>
        <p className="text-xs text-slate-500 mt-1">Audit evaluation scorecards, grades, and full answer keys across all student submissions.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        <div className="sm:col-span-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FaSearch className="text-xs" />
          </div>
          <input
            type="text"
            placeholder="Search by student candidate name, subject, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-indigo-600"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:border-indigo-600"
          >
            <option value="ALL">All Subjects</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">Student Candidate</th>
                <th className="py-3.5 px-5">Subject</th>
                <th className="py-3.5 px-5">Submission Date</th>
                <th className="py-3.5 px-5 text-center">Score</th>
                <th className="py-3.5 px-5 text-center">Percentage</th>
                <th className="py-3.5 px-5 text-center">Grade Result</th>
                <th className="py-3.5 px-5 text-right">Inspect Scorecard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {filteredResults.map((res) => {
                const isPassed = res.percentage >= 50;

                return (
                  <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-5 font-bold text-slate-900">{res.studentName}</td>
                    
                    <td className="py-4 px-5">
                      <span className="font-extrabold text-slate-900 block">{res.subject}</span>
                      <span className="text-[10px] font-mono text-slate-400">{res.examCode || 'EXAM'}</span>
                    </td>

                    <td className="py-4 px-5 text-slate-600">{res.submittedAt}</td>

                    <td className="py-4 px-5 text-center font-bold text-slate-900">
                      {res.score} / {res.totalQuestions}
                    </td>

                    <td className="py-4 px-5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {res.percentage}%
                      </span>
                    </td>

                    <td className="py-4 px-5 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isPassed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {isPassed ? 'Passed' : 'Failed'}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleInspectResult(res)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold rounded-xl border border-indigo-200 transition-colors cursor-pointer text-xs inline-flex items-center gap-1.5"
                      >
                        <FaEye />
                        <span>Scorecard</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Scorecard Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">Candidate Evaluation Report</h3>
                <p className="text-xs text-slate-500">Student: {selectedResult.studentName}</p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
              >
                <FaTimes />
              </button>
            </div>

            <ResultCard result={selectedResult} />

            <div className="pt-2 flex justify-between items-center border-t border-slate-100">
              <button
                onClick={() => setIsAnswersOpen(!isAnswersOpen)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                {isAnswersOpen ? 'Hide Answer Key' : 'Inspect Candidate Answers'}
              </button>

              <button
                onClick={() => setSelectedResult(null)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Scorecard
              </button>
            </div>

            {/* Answer key expandable section */}
            {isAnswersOpen && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="font-extrabold text-slate-900 text-sm">Full Candidate Answers Audit:</h4>
                <div className="space-y-3">
                  {currentQuestions.map((q, qIdx) => {
                    const candidateChoice = selectedResult.userAnswers[qIdx];
                    const isUnanswered = candidateChoice === undefined || candidateChoice === null;
                    const isCorrect = !isUnanswered && candidateChoice === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border text-xs ${
                          isCorrect ? 'bg-emerald-50/50 border-emerald-200' : isUnanswered ? 'bg-amber-50/50 border-amber-200' : 'bg-rose-50/50 border-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span>Question {qIdx + 1}: {q.question}</span>
                          <span className="font-extrabold">
                            {isCorrect ? '✓ Correct' : isUnanswered ? '— Unanswered' : '✗ Wrong'}
                          </span>
                        </div>
                        <p className="text-slate-600">
                          Candidate Choice: <strong>{isUnanswered ? 'None' : `${String.fromCharCode(65 + candidateChoice)}. ${q.options[candidateChoice]}`}</strong>
                        </p>
                        <p className="text-emerald-700 font-semibold">
                          Correct Choice: <strong>{String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}</strong>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminResults;
