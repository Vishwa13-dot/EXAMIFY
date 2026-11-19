import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaInfoCircle, 
  FaClock, 
  FaQuestionCircle, 
  FaCheckSquare, 
  FaPlayCircle, 
  FaExclamationTriangle,
  FaArrowLeft,
  FaShieldAlt
} from 'react-icons/fa';
import { questionsData } from '../data/questions';

/**
 * ExamInstructions page displaying rules and guidelines before starting an active exam attempt.
 */
const ExamInstructions = ({ exams, userResults }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const exam = exams.find((e) => e.id === id);
  const questionsList = exam ? questionsData[exam.subjectId] || [] : [];
  const totalQuestions = exam?.totalQuestions || questionsList.length || 20;

  if (!exam) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Examination Not Found</h3>
        <p className="text-xs text-slate-500">The requested exam ID does not exist or has been removed.</p>
        <Link to="/exams" className="inline-block px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">
          Back to Exams Catalog
        </Link>
      </div>
    );
  }

  // Check if exam is already attempted or terminated
  const existingAttempt = userResults.find((r) => r.examId === exam.id);
  if (existingAttempt) {
    if (existingAttempt.status === 'terminated') {
      return (
        <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center space-y-4 max-w-lg mx-auto shadow-md">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xl font-bold mx-auto">
            ⚠️
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Attempt Terminated — Disqualified</h3>
          <p className="text-xs text-rose-700 leading-relaxed font-medium">
            Your attempt for <strong>{exam.subject}</strong> was automatically terminated because a tab/window switch was detected. Answers were discarded and restart is not permitted.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => navigate(`/exams/${exam.id}/terminated`)}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              View Termination Details
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold mx-auto">
          ✓
        </div>
        <h3 className="text-lg font-extrabold text-slate-900">Already Completed</h3>
        <p className="text-xs text-slate-600">
          You have already completed the <strong>{exam.subject}</strong> examination on {existingAttempt.submittedAt}.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => navigate(`/results/${exam.id}`)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            View Evaluation Result
          </button>
        </div>
      </div>
    );
  }

  // Check if exam status is not ongoing
  if (exam.status !== 'Ongoing') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 max-w-lg mx-auto">
        <FaExclamationTriangle className="text-3xl text-amber-500 mx-auto" />
        <h3 className="text-lg font-extrabold text-slate-900">Examination Not Active</h3>
        <p className="text-xs text-slate-600">
          This examination status is currently <strong>{exam.status}</strong>. You cannot start an exam before its scheduled time.
        </p>
        <button
          onClick={() => navigate('/exams')}
          className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const instructionsList = [
    `The examination contains ${totalQuestions} multiple-choice questions (MCQs).`,
    `The total examination duration is ${exam.duration || 60} minutes.`,
    'Only one option can be selected for each question.',
    'Students can freely navigate between questions using Next, Previous, or the Question Navigator.',
    'Students can change their selected answer anytime before final submission.',
    'Students can submit the examination manually at any time before the timer expires.',
    'The examination will automatically submit when the countdown timer reaches 00:00.',
    'SECURITY RULE: Leaving or switching the browser tab/window will AUTOMATICALLY TERMINATE and disqualify your exam attempt immediately.'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/exams')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
        >
          <FaArrowLeft />
          <span>Back to Catalog</span>
        </button>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Official Examination Portal
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
        
        {/* Exam Headline Header */}
        <div className="pb-6 border-b border-slate-100">
          <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700">
            {exam.code}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            {exam.subject} Examination
          </h1>
          <p className="text-xs text-slate-500 mt-1">{exam.description}</p>
        </div>

        {/* Exam Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
          
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Date</p>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5">{exam.date}</p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Start Time</p>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5">{exam.startTime}</p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Duration</p>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <FaClock className="text-emerald-600 text-xs" />
              <span>{exam.duration || 60} Minutes</span>
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Question Format</p>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <FaQuestionCircle className="text-emerald-600 text-xs" />
              <span>{totalQuestions} MCQs</span>
            </p>
          </div>

        </div>

        {/* Rules & Guidelines */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FaInfoCircle className="text-emerald-600" />
            <span>Important Examination Rules & Instructions</span>
          </h3>

          <div className="space-y-2.5">
            {instructionsList.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50/60 rounded-xl border border-slate-100 text-xs text-slate-700 font-medium">
                <FaCheckSquare className="text-emerald-500 mt-0.5 text-sm flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Notice */}
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 space-y-1">
          <div className="flex items-center gap-2 font-bold text-rose-950">
            <FaShieldAlt className="text-rose-600 text-sm" />
            <span>Strict Anti-Cheating & Tab-Switch Monitoring</span>
          </div>
          <p className="leading-relaxed text-[11px] font-medium text-rose-800">
            Do not switch browser tabs, open other applications, or minimize the window during testing. Any tab switch will immediately terminate your exam attempt and discard all answers.
          </p>
        </div>

        {/* Start Exam Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => navigate(`/exams/${exam.id}`)}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 cursor-pointer transform active:scale-98"
          >
            <FaPlayCircle className="text-lg" />
            <span>Start Exam Now</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ExamInstructions;
