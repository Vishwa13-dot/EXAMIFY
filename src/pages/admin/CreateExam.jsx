import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaClipboardList, 
  FaFileExcel, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaPlus
} from 'react-icons/fa';
import ExcelUploader from '../../components/admin/ExcelUploader';
import ExcelValidationMessage from '../../components/admin/ExcelValidationMessage';
import ExcelPreview from '../../components/admin/ExcelPreview';
import { parseExcelFile, processAndValidateExcelData } from '../../utils/excelParser';

/**
 * CreateExam page providing complete workflow for scheduling an exam via Excel Upload.
 */
const CreateExam = ({ subjects, onAddExamWithQuestions }) => {
  const navigate = useNavigate();

  // Form Details state
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || 'sub-java');
  const [examTitle, setExamTitle] = useState('');
  const [examCode, setExamCode] = useState(`EX-${Math.floor(100 + Math.random() * 900)}`);
  const [date, setDate] = useState('2026-10-15');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('11:00 AM');
  const [duration, setDuration] = useState(60);
  const [instructions, setInstructions] = useState(
    'The examination contains 20 multiple-choice questions. Only one option can be selected for each question. The test will automatically submit when the timer expires.'
  );

  // Excel File and Parsing States
  const [fileSummary, setFileSummary] = useState(null);
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [validationResult, setValidationResult] = useState({
    isValid: false,
    errors: [],
    countNotice: ''
  });
  const [isParsing, setIsParsing] = useState(false);

  // Handle Excel File Selection
  const handleFileSelected = async (file) => {
    setIsParsing(true);
    setValidationResult({ isValid: false, errors: [], countNotice: '' });

    try {
      const rawRows = await parseExcelFile(file);
      const res = processAndValidateExcelData(rawRows);

      setFileSummary({
        name: file.name,
        totalCount: res.totalCount,
        countNotice: res.countNotice
      });

      setParsedQuestions(res.questions);

      // Re-evaluate validation with current questions count
      evaluateValidation(res.questions, res.errors);
    } catch (err) {
      setFileSummary(null);
      setParsedQuestions([]);
      setValidationResult({
        isValid: false,
        errors: [err.message || 'Error processing Excel file.'],
        countNotice: ''
      });
    } finally {
      setIsParsing(false);
    }
  };

  // Re-evaluates question validation state after questions are modified or deleted
  const evaluateValidation = (questionsList, initialErrors = []) => {
    const errs = [...initialErrors];
    const count = questionsList.length;

    let notice = '';

    if (count < 20) {
      errs.push(`⚠️ Only ${count} questions found. An examination requires exactly 20 questions.`);
    } else if (count > 20) {
      errs.push(`⚠️ ${count} questions found. The exam requires exactly 20 questions.`);
    } else {
      notice = '✓ 20 questions detected. Exam is ready to create.';
    }

    const isValid = errs.length === 0 && count === 20;

    setValidationResult({
      isValid,
      errors: errs,
      countNotice: notice
    });
  };

  // Handle removing a question from preview
  const handleDeleteQuestionFromPreview = (indexToDelete) => {
    const updated = parsedQuestions.filter((_, idx) => idx !== indexToDelete);
    setParsedQuestions(updated);

    // Filter out previous count errors and re-evaluate
    const nonCountErrors = validationResult.errors.filter(
      (e) => !e.includes('questions found') && !e.includes('requires exactly 20')
    );
    evaluateValidation(updated, nonCountErrors);
  };

  // Handle replacing file
  const handleResetFile = () => {
    setFileSummary(null);
    setParsedQuestions([]);
    setValidationResult({ isValid: false, errors: [], countNotice: '' });
  };

  // Final Form Submit Handler
  const handleCreateExam = (e) => {
    e.preventDefault();

    if (!validationResult.isValid || parsedQuestions.length !== 20) {
      alert('Cannot create exam. Please ensure exactly 20 valid questions are uploaded via Excel.');
      return;
    }

    const selectedSubObj = subjects.find((s) => s.id === subjectId) || subjects[0];
    const newExamId = `exam-${Date.now()}`;

    const newExamObj = {
      id: newExamId,
      subjectId,
      subject: selectedSubObj.name,
      title: examTitle.trim() || `${selectedSubObj.name} Examination`,
      code: examCode.trim() || selectedSubObj.code,
      date,
      startTime,
      endTime,
      duration: Number(duration),
      totalQuestions: 20,
      status: 'Upcoming',
      description: `${selectedSubObj.name} evaluation test created via Excel import.`,
      instructions,
      instructor: 'System Administrator'
    };

    // Format questions for storage & compatibility with student test engine
    const formattedQuestions = parsedQuestions.map((q, idx) => ({
      id: `q-${subjectId}-${idx + 1}-${Date.now()}`,
      subjectId,
      question: q.question,
      options: q.options.map((opt) => opt.text), // string array
      optionObjects: q.options, // structured option objects
      correctAnswer: q.correctAnswerIndex !== -1 ? q.correctAnswerIndex : 0, // numeric index for test runner
      correctAnswerLetter: q.correctAnswer // letter 'A', 'B', 'C', 'D'
    }));

    // Trigger parent callback to save state & SecureLS
    onAddExamWithQuestions(newExamObj, subjectId, formattedQuestions);

    // Redirect to /admin/exams with success notice
    navigate('/admin/exams', {
      state: {
        successMessage: `✓ Exam "${newExamObj.subject}" created successfully! 20 questions uploaded from Excel.`
      }
    });
  };

  const isCreateEnabled =
    validationResult.isValid &&
    parsedQuestions.length === 20 &&
    subjectId &&
    date &&
    startTime;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/exams"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Exams List</span>
        </Link>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Excel Exam Creation Wizard
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Create New Examination
        </h2>
        <p className="text-xs text-slate-500">
          Enter exam details and upload an Excel spreadsheet (.xlsx) containing all 20 MCQs.
        </p>
      </div>

      <form onSubmit={handleCreateExam} className="space-y-8">
        
        {/* Section 1: Exam Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl">
              <FaClipboardList />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">1. Exam Details & Schedule</h3>
              <p className="text-xs text-slate-500">Specify subject, schedule date, start time, and duration.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:border-indigo-600"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name} ({sub.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Exam Title (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Java OOP Mid-Term Assessment"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Exam Code
              </label>
              <input
                type="text"
                required
                value={examCode}
                onChange={(e) => setExamCode(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Scheduled Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Start Time
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 10:00 AM"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Duration (Mins)
                </label>
                <input
                  type="number"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Total Questions
                </label>
                <div className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl font-extrabold text-slate-700">
                  {parsedQuestions.length > 0 ? `${parsedQuestions.length} (Auto-detected)` : '20 (Auto-detected)'}
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Examination Instructions
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Upload Question Excel File */}
        <ExcelUploader
          onFileSelected={handleFileSelected}
          fileSummary={fileSummary}
          onResetFile={handleResetFile}
          isProcessing={isParsing}
        />

        {/* Section 3: Validation Messages Banner */}
        <ExcelValidationMessage
          isValid={validationResult.isValid}
          errors={validationResult.errors}
          countNotice={validationResult.countNotice}
          totalCount={parsedQuestions.length}
        />

        {/* Section 4: Questions Preview (Cards & Table view) */}
        {parsedQuestions.length > 0 && (
          <ExcelPreview
            questions={parsedQuestions}
            onDeleteQuestion={handleDeleteQuestionFromPreview}
          />
        )}

        {/* Section 5: Action Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between gap-4 shadow-xs">
          <button
            type="button"
            onClick={() => navigate('/admin/exams')}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {!isCreateEnabled && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hidden sm:inline-block">
                ⚠️ Upload a valid 20-question Excel sheet to enable creation
              </span>
            )}

            <button
              type="submit"
              disabled={!isCreateEnabled}
              className={`px-8 py-3.5 rounded-2xl font-black text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                isCreateEnabled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 transform active:scale-98'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300 shadow-none'
              }`}
            >
              <FaPlus />
              <span>Create Exam</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
};

export default CreateExam;
