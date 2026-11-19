import React, { useState } from 'react';
import { FaQuestionCircle, FaPlus, FaEdit, FaTrash, FaTimes, FaCheckCircle } from 'react-icons/fa';

/**
 * AdminQuestions page for inspecting, adding, editing, and deleting MCQs by subject.
 */
const AdminQuestions = ({ subjects, questionsData, onAddQuestion, onEditQuestion, onDeleteQuestion }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 0
  });

  const currentQuestions = questionsData[selectedSubjectId] || [];

  const handleOpenAdd = () => {
    setFormData({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 0
    });
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setEditingQuestion(q);
    setFormData({
      question: q.question,
      optionA: q.options[0] || '',
      optionB: q.options[1] || '',
      optionC: q.options[2] || '',
      optionD: q.options[3] || '',
      correctAnswer: q.correctAnswer
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: editingQuestion ? editingQuestion.id : `q-${selectedSubjectId}-${Date.now()}`,
      subjectId: selectedSubjectId,
      question: formData.question.trim(),
      options: [
        formData.optionA.trim(),
        formData.optionB.trim(),
        formData.optionC.trim(),
        formData.optionD.trim()
      ],
      correctAnswer: Number(formData.correctAnswer)
    };

    if (editingQuestion) {
      onEditQuestion(selectedSubjectId, payload);
    } else {
      onAddQuestion(selectedSubjectId, payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Question Bank Management</h2>
          <p className="text-xs text-slate-500 mt-1">Review, insert, modify, or delete subject-wise multiple choice questions.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <FaPlus />
          <span>Add New MCQ</span>
        </button>
      </div>

      {/* Subject Filter Dropdown Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FaQuestionCircle className="text-indigo-600 text-lg" />
          <span className="text-xs font-bold text-slate-700">Select Subject Question Bank:</span>
        </div>

        <select
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          className="py-2 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:border-indigo-600"
        >
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name} ({questionsData[sub.id]?.length || 0} Questions)
            </option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-700">
            Total {currentQuestions.length} Questions for Selected Subject
          </h3>
        </div>

        {currentQuestions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs font-extrabold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                Question {idx + 1}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(q)}
                  className="p-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-800 rounded-lg text-xs transition-colors cursor-pointer"
                  title="Edit Question"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDeleteQuestion(selectedSubjectId, q.id)}
                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs transition-colors cursor-pointer"
                  title="Delete Question"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <p className="text-sm font-bold text-slate-900">{q.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {q.options.map((opt, optIdx) => {
                const isCorrect = q.correctAnswer === optIdx;
                return (
                  <div
                    key={optIdx}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                    {isCorrect && (
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded flex items-center gap-1">
                        <FaCheckCircle /> Correct Answer
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {editingQuestion ? 'Edit Question' : 'Add New MCQ'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Question Prompt</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter the question text..."
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-700 uppercase tracking-wider">Option Choices</label>
                
                <input
                  type="text"
                  required
                  placeholder="Option A"
                  value={formData.optionA}
                  onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
                
                <input
                  type="text"
                  required
                  placeholder="Option B"
                  value={formData.optionB}
                  onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
                
                <input
                  type="text"
                  required
                  placeholder="Option C"
                  value={formData.optionC}
                  onChange={(e) => setFormData({ ...formData, optionC: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
                
                <input
                  type="text"
                  required
                  placeholder="Option D"
                  value={formData.optionD}
                  onChange={(e) => setFormData({ ...formData, optionD: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Select Correct Answer</label>
                <select
                  value={formData.correctAnswer}
                  onChange={(e) => setFormData({ ...formData, correctAnswer: Number(e.target.value) })}
                  className="w-full p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 font-bold"
                >
                  <option value={0}>Option A (First choice)</option>
                  <option value={1}>Option B (Second choice)</option>
                  <option value={2}>Option C (Third choice)</option>
                  <option value={3}>Option D (Fourth choice)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md"
                >
                  {editingQuestion ? 'Save Question' : 'Add Question'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminQuestions;
