import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserGraduate, 
  FaClipboardList, 
  FaBook, 
  FaQuestionCircle, 
  FaPoll, 
  FaPlus,
  FaCheckCircle,
  FaArrowRight,
  FaEye
} from 'react-icons/fa';

/**
 * AdminDashboard page providing high-level system metrics and quick management controls.
 */
const AdminDashboard = ({ users, exams, subjects, questionsData, userResults }) => {
  const navigate = useNavigate();

  // Metric computations
  const studentUsers = users.filter((u) => u.role === 'Student');
  const ongoingExams = exams.filter((e) => e.status === 'Ongoing');
  
  // Total questions count across all subjects
  const totalQuestionsCount = Object.values(questionsData).reduce(
    (acc, qList) => acc + (qList ? qList.length : 0),
    0
  );

  // Compute System Pass Rate
  const passedResults = userResults.filter((r) => r.percentage >= 50);
  const passRate = userResults.length > 0 ? Math.round((passedResults.length / userResults.length) * 100) : 0;

  return (
    <div className="space-y-8">
      
      {/* Welcome Hero Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/40">
            System Administration Panel
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Examify Control & Management Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Monitor real-time exam schedules, manage subject question banks, create tests, register candidates, and audit evaluation reports.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => navigate('/admin/exams')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <FaPlus />
            <span>Create New Exam</span>
          </button>
          <button
            onClick={() => navigate('/admin/questions')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            <FaQuestionCircle />
            <span>Question Bank</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-indigo-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Students</span>
            <FaUserGraduate />
          </div>
          <p className="text-2xl font-black text-slate-900">{studentUsers.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Exams</span>
            <FaClipboardList />
          </div>
          <p className="text-2xl font-black text-slate-900">{ongoingExams.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Exams</span>
            <FaClipboardList />
          </div>
          <p className="text-2xl font-black text-slate-900">{exams.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-purple-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Subjects</span>
            <FaBook />
          </div>
          <p className="text-2xl font-black text-slate-900">{subjects.length}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">MCQs Bank</span>
            <FaQuestionCircle />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalQuestionsCount}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-teal-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pass Rate</span>
            <FaPoll />
          </div>
          <p className="text-2xl font-black text-slate-900">{passRate}%</p>
        </div>

      </div>

      {/* Recent Student Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <FaPoll className="text-indigo-600" />
              <span>Recent Student Submissions</span>
            </h3>
            <p className="text-xs text-slate-500">Live evaluation feed of submitted candidate tests.</p>
          </div>
          <button
            onClick={() => navigate('/admin/results')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Results</span>
            <FaArrowRight />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Submission Time</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-center">Percentage</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {userResults.slice(0, 5).map((res) => {
                const isPassed = res.percentage >= 50;
                return (
                  <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{res.studentName}</td>
                    <td className="py-3.5 px-4">{res.subject}</td>
                    <td className="py-3.5 px-4 text-slate-500">{res.submittedAt}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                      {res.score} / {res.totalQuestions}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {res.percentage}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/results`)}
                        className="p-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-800 rounded-lg transition-colors cursor-pointer"
                        title="View Scorecard"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
