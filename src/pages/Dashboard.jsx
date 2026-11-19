import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaClock, 
  FaPlayCircle, 
  FaCheckCircle, 
  FaChartLine, 
  FaArrowRight, 
  FaBookOpen,
  FaTimes,
  FaCalendarAlt,
  FaQuestionCircle
} from 'react-icons/fa';
import ExamCard from '../components/ExamCard';
import ExamStatusBadge from '../components/ExamStatusBadge';

/**
 * Dashboard page displaying summary cards and categorized lists of Ongoing, Upcoming, and Previous exams.
 */
const Dashboard = ({ currentUser, exams, userResults }) => {
  const navigate = useNavigate();
  const [selectedModalExam, setSelectedModalExam] = useState(null);

  // Categorize exams based on status and user attempt history
  const ongoingExams = exams.filter((e) => e.status === 'Ongoing');
  const upcomingExams = exams.filter((e) => e.status === 'Upcoming');
  
  // Previous exams includes those with status 'Previous' OR already attempted by user
  const completedExamIds = userResults.map((r) => r.examId);
  const previousExams = exams.filter((e) => e.status === 'Previous' || completedExamIds.includes(e.id));

  // Calculate Average Score percentage
  const totalPercentageSum = userResults.reduce((acc, curr) => acc + curr.percentage, 0);
  const averageScore = userResults.length > 0 ? Math.round(totalPercentageSum / userResults.length) : 0;

  return (
    <div className="space-y-8">
      
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/20 rounded-full blur-2xl"></div>

        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-md">
            <span>Welcome back, {currentUser?.fullName || 'Student'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready for your next examination?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Stay on track with your scheduled subject assessments. Make sure to review the instructions prior to initiating any active test.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={() => navigate('/exams')}
            className="px-5 py-3 bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer transform active:scale-98"
          >
            <span>Browse All Exams</span>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Metric Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Ongoing */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ongoing Exams</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{ongoingExams.length}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Active right now
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
            <FaPlayCircle />
          </div>
        </div>

        {/* Card 2: Upcoming */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming Exams</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{upcomingExams.length}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Scheduled tests</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
            <FaClock />
          </div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed Exams</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{userResults.length}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Evaluated tests</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
            <FaCheckCircle />
          </div>
        </div>

        {/* Card 4: Average Score */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Score</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{averageScore}%</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Overall performance</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
            <FaChartLine />
          </div>
        </div>

      </div>

      {/* Section 1: Ongoing Examinations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Ongoing Examinations</span>
            </h3>
            <p className="text-xs text-slate-500">Exams currently open for attempt.</p>
          </div>
        </div>

        {ongoingExams.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
            No ongoing examinations at this moment. Check back during scheduled hours.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ongoingExams.map((exam) => {
              const attempt = userResults.find((r) => r.examId === exam.id);
              return (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  attemptResult={attempt}
                  onSelectDetails={(e) => setSelectedModalExam(e)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Section 2: Upcoming Examinations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <FaClock className="text-amber-500" />
              <span>Upcoming Examinations</span>
            </h3>
            <p className="text-xs text-slate-500">Scheduled for future dates and times.</p>
          </div>
        </div>

        {upcomingExams.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
            No upcoming examinations scheduled.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                attemptResult={null}
                onSelectDetails={(e) => setSelectedModalExam(e)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section 3: Previous / Completed Examinations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <FaCheckCircle className="text-slate-500" />
              <span>Previous & Completed Examinations</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">History of attempted and past exams.</p>
          </div>
        </div>

        {previousExams.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
            No completed examinations history yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {previousExams.map((exam) => {
              const attempt = userResults.find((r) => r.examId === exam.id);
              return (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  attemptResult={attempt}
                  onSelectDetails={(e) => setSelectedModalExam(e)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for Upcoming Exam Details */}
      {selectedModalExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                  {selectedModalExam.code}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedModalExam.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedModalExam(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><FaCalendarAlt /> Date:</span>
                <span className="font-bold text-slate-900">{selectedModalExam.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><FaClock /> Time:</span>
                <span className="font-bold text-slate-900">{selectedModalExam.startTime} - {selectedModalExam.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><FaClock /> Duration:</span>
                <span className="font-bold text-slate-900">{selectedModalExam.duration} Minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><FaQuestionCircle /> Total MCQs:</span>
                <span className="font-bold text-slate-900">{selectedModalExam.totalQuestions} Questions</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="text-slate-500">Status:</span>
                <ExamStatusBadge status={selectedModalExam.status} />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl text-xs leading-relaxed font-medium">
              ℹ️ Notice: The "Start Exam" button will become active when the scheduled start time is reached on {selectedModalExam.date}.
            </div>

            <button
              onClick={() => setSelectedModalExam(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
