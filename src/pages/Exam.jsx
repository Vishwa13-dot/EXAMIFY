import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaExclamationTriangle } from 'react-icons/fa';
import QuestionCard from '../components/QuestionCard';
import QuestionNavigator from '../components/QuestionNavigator';
import Timer from '../components/Timer';
import ConfirmationModal from '../components/ConfirmationModal';
import { questionsData } from '../data/questions';

/**
 * Main Exam page hosting active test execution with tab-switch security.
 */
const Exam = ({ exams, currentUser, onCompleteExam, userResults }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const exam = exams.find((e) => e.id === id);
  const questions = exam ? questionsData[exam.subjectId] || [] : [];

  // Local examination active states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { 0: 1, 1: 3, ... }
  const [secondsLeft, setSecondsLeft] = useState((exam?.duration || 60) * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSubmittedRef = useRef(false);

  // Check if exam attempt already exists
  const existingAttempt = userResults.find((r) => r.examId === id);
  if (existingAttempt) {
    if (existingAttempt.status === 'terminated') {
      navigate(`/exams/${id}/terminated`, { replace: true });
    } else {
      navigate(`/results/${id}`, { replace: true });
    }
    return null;
  }

  if (!exam || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md">
          <FaExclamationTriangle className="text-3xl text-rose-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-900">Questions Not Found</h3>
          <p className="text-xs text-slate-500 mt-1">Unable to load examination dataset for this subject.</p>
          <button
            onClick={() => navigate('/exams')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  // Security Tab Switch Detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmittedRef.current) {
        isSubmittedRef.current = true;

        const now = new Date();
        const submittedAt = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

        const terminatedResult = {
          id: `res-term-${Date.now()}`,
          examId: exam.id,
          subjectId: exam.subjectId,
          subject: exam.subject,
          examCode: exam.code,
          studentName: currentUser?.fullName || 'Student',
          studentUsername: currentUser?.username || 'user',
          submittedAt,
          totalQuestions: questions.length,
          score: null,
          percentage: null,
          correctCount: 0,
          wrongCount: 0,
          unansweredCount: questions.length,
          status: 'terminated',
          terminationReason: 'Tab Switch',
          submissionType: 'Terminated — Tab Switch',
          userAnswers: {}
        };

        onCompleteExam(terminatedResult);
        navigate(`/exams/${id}/terminated`, { replace: true });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [exam, id, currentUser, questions.length, navigate, onCompleteExam]);

  // Calculate scores and record completed exam result
  const handleFinalSubmit = useCallback(
    (submissionMode = 'Submitted by Student') => {
      if (isSubmitting || isSubmittedRef.current) return;
      isSubmittedRef.current = true;
      setIsSubmitting(true);

      let correctCount = 0;
      let wrongCount = 0;
      let unansweredCount = 0;

      questions.forEach((q, index) => {
        const studentAns = answers[index];

        // Check against both option index (number) and option letter string ('A', 'B', 'C', 'D')
        const targetAnsIndex = q.correctAnswerIndex !== undefined ? q.correctAnswerIndex : q.correctAnswer;

        if (studentAns === undefined || studentAns === null) {
          unansweredCount++;
        } else if (studentAns === targetAnsIndex || studentAns === q.correctAnswer) {
          correctCount++;
        } else {
          wrongCount++;
        }
      });

      const totalQuestions = questions.length;
      const score = correctCount;
      const percentage = Math.round((correctCount / totalQuestions) * 100);

      const totalDurationSecs = (exam.duration || 60) * 60;
      const timeSpentSeconds = Math.max(0, totalDurationSecs - secondsLeft);
      const minsSpent = Math.floor(timeSpentSeconds / 60);
      const secsSpent = timeSpentSeconds % 60;
      const timeTakenFormatted = `${minsSpent}m ${secsSpent}s`;

      const now = new Date();
      const submittedAt = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const resultObject = {
        id: `res-${Date.now()}`,
        examId: exam.id,
        subjectId: exam.subjectId,
        subject: exam.subject,
        examCode: exam.code,
        studentName: currentUser?.fullName || 'Student',
        studentUsername: currentUser?.username || 'user',
        submittedAt,
        totalQuestions,
        score,
        percentage,
        correctCount,
        wrongCount,
        unansweredCount,
        timeTakenFormatted,
        status: 'completed',
        submissionType: submissionMode,
        userAnswers: { ...answers }
      };

      onCompleteExam(resultObject);
      navigate(`/results/${exam.id}`, { replace: true });
    },
    [answers, currentUser, exam, navigate, onCompleteExam, questions, secondsLeft, isSubmitting]
  );

  // Auto submit when countdown timer expires
  const handleTimerExpire = useCallback(() => {
    handleFinalSubmit('Automatically submitted — Time Expired');
  }, [handleFinalSubmit]);

  // Option selection handler
  const handleSelectOption = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      
      {/* Exam Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              <FaGraduationCap />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg">{exam.subject}</span>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                  {exam.code}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Candidate: {currentUser?.fullName}</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-3">
            <Timer
              secondsLeft={secondsLeft}
              setSecondsLeft={setSecondsLeft}
              onExpire={handleTimerExpire}
            />

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Submit Exam</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left / Main Question Card (Col 8) */}
          <div className="lg:col-span-8">
            <QuestionCard
              question={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              selectedAnswer={answers[currentIndex]}
              onSelectOption={handleSelectOption}
              onPrev={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              onNext={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              onSubmitClick={() => setIsSubmitModalOpen(true)}
            />
          </div>

          {/* Right Question Navigator Panel (Col 4) */}
          <div className="lg:col-span-4">
            <QuestionNavigator
              totalQuestions={questions.length}
              currentIndex={currentIndex}
              answers={answers}
              onSelectQuestion={(idx) => setCurrentIndex(idx)}
              onSubmitClick={() => setIsSubmitModalOpen(true)}
            />
          </div>

        </div>
      </main>

      {/* Submit Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={() => handleFinalSubmit('Submitted by Student')}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        totalQuestions={questions.length}
      />

    </div>
  );
};

export default Exam;
