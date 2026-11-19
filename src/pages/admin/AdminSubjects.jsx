import React, { useState } from 'react';
import { FaBook, FaPlus, FaEdit, FaTimes, FaQuestionCircle, FaClipboardList } from 'react-icons/fa';

/**
 * AdminSubjects page for adding and editing academic subjects.
 */
const AdminSubjects = ({ subjects, exams, questionsData, onAddSubject, onEditSubject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    color: 'emerald'
  });

  const handleOpenAdd = () => {
    setFormData({ name: '', code: '', description: '', color: 'emerald' });
    setEditingSub(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sub) => {
    setEditingSub(sub);
    setFormData({
      name: sub.name,
      code: sub.code,
      description: sub.description,
      color: sub.color || 'emerald'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: editingSub ? editingSub.id : `sub-${Date.now()}`,
      name: formData.name.trim(),
      code: formData.code.trim(),
      description: formData.description.trim(),
      color: formData.color,
      iconName: 'FaBook'
    };

    if (editingSub) {
      onEditSubject(payload);
    } else {
      onAddSubject(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Academic Subjects Directory</h2>
          <p className="text-xs text-slate-500 mt-1">Manage core curriculum subjects, course codes, and descriptions.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <FaPlus />
          <span>Add New Subject</span>
        </button>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((sub) => {
          const subExams = exams.filter((e) => e.subjectId === sub.id);
          const subQuestions = questionsData[sub.id] || [];

          return (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    {sub.code}
                  </span>
                  <button
                    onClick={() => handleOpenEdit(sub)}
                    className="p-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-800 rounded-lg transition-colors cursor-pointer text-xs"
                    title="Edit Subject"
                  >
                    <FaEdit />
                  </button>
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {sub.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {sub.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <FaClipboardList className="text-indigo-500" /> {subExams.length} Exams
                </span>
                <span className="flex items-center gap-1.5">
                  <FaQuestionCircle className="text-emerald-500" /> {subQuestions.length} MCQs
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Subject Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {editingSub ? 'Edit Subject' : 'Add New Subject'}
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
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Course Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS608"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Core syllabus and topics overview..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
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
                  {editingSub ? 'Save Changes' : 'Create Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminSubjects;
