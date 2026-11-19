import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  FaClipboardList, 
  FaPlus, 
  FaFileExcel,
  FaEdit, 
  FaTrash, 
  FaTimes, 
  FaCalendarAlt, 
  FaClock,
  FaCheckCircle,
  FaPlayCircle,
  FaPauseCircle,
  FaQuestionCircle
} from 'react-icons/fa';
import ExamStatusBadge from '../../components/ExamStatusBadge';

/**
 * AdminExams page for creating, editing, deleting, and managing exam schedules.
 */
const AdminExams = ({ exams, subjects, onAddExam, onEditExam, onDeleteExam, onUpdateStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);

  const successMessage = location.state?.successMessage;

  // Form states for Add / Edit
  const [formData, setFormData] = useState({
    subjectId: subjects[0]?.id || '',
    code: 'CS605',
    date: '2026-10-10',
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    duration: 60,
    totalQuestions: 20,
    passingScore: 10,
    status: 'Upcoming',
    description: 'Comprehensive subject evaluation test.',
    instructor: 'Prof. Admin'
  });

  const handleOpenAdd = () => {
    setFormData({
      subjectId: subjects[0]?.id || '',
      code: 'CS605',
      date: '2026-10-10',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      duration: 60,
      totalQuestions: 20,
      passingScore: 10,
      status: 'Upcoming',
      description: 'Comprehensive subject evaluation test.',
      instructor: 'Prof. Admin'
    });
    setEditingExam(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (exam) => {
    setEditingExam(exam);
    setFormData({
      subjectId: exam.subjectId,
      code: exam.code,
      date: exam.date,
      startTime: exam.startTime,
      endTime: exam.endTime,
      duration: exam.duration,
      totalQuestions: exam.totalQuestions,
      passingScore: exam.passingScore || 10,
      status: exam.status,
      description: exam.description,
      instructor: exam.instructor || 'Prof. Admin'
    });
    setIsAddModalOpen(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const selectedSub = subjects.find((s) => s.id === formData.subjectId) || subjects[0];

    const examPayload = {
      id: editingExam ? editingExam.id : `exam-${Date.now()}`,
      subjectId: formData.subjectId,
      subject: selectedSub.name,
      code: formData.code,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration: Number(formData.duration),
      totalQuestions: Number(formData.totalQuestions),
      passingScore: Number(formData.passingScore),
      status: formData.status,
      description: formData.description,
      instructor: formData.instructor
    };

    if (editingExam) {
      onEditExam(examPayload);
    } else {
      onAddExam(examPayload);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Examinations Management</h2>
          <p className="text-xs text-slate-500 mt-1">Schedule, launch, modify, or terminate academic subject examinations.</p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/admin/exams/create"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer transform active:scale-98"
          >
            <FaFileExcel className="text-sm" />
            <span>Create New Exam (Excel Upload)</span>
          </Link>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer flex items-center gap-2"
          >
            <FaPlus />
            <span>Quick Manual Add</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner if redirected from Exam Creation */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-3 font-semibold shadow-xs animate-fade-in">
          <FaCheckCircle className="text-emerald-600 text-xl flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Master Exams Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">Subject / Code</th>
                <th className="py-3.5 px-5">Schedule Date & Time</th>
                <th className="py-3.5 px-5 text-center">Duration</th>
                <th className="py-3.5 px-5 text-center">MCQs</th>
                <th className="py-3.5 px-5 text-center">Current Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-slate-50 transition-colors">
                  
                  <td className="py-4 px-5">
                    <span className="font-extrabold text-slate-900 block">{exam.subject}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-600">{exam.code}</span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <FaCalendarAlt className="text-slate-400" /> {exam.date}
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <FaClock className="text-slate-400" /> {exam.startTime} - {exam.endTime}
                      </p>
                    </div>
                  </td>

                  <td className="py-4 px-5 text-center font-bold text-slate-900">
                    {exam.duration} mins
                  </td>

                  <td className="py-4 px-5 text-center font-bold text-slate-900">
                    {exam.totalQuestions}
                  </td>

                  <td className="py-4 px-5 text-center">
                    <ExamStatusBadge status={exam.status} />
                  </td>

                  <td className="py-4 px-5 text-right space-x-2">
                    {/* Manage Questions button */}
                    <button
                      onClick={() => navigate('/admin/questions')}
                      className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors cursor-pointer text-xs"
                      title="Manage Questions"
                    >
                      <FaQuestionCircle />
                    </button>

                    {/* Quick status toggle button */}
                    <button
                      onClick={() =>
                        onUpdateStatus(
                          exam.id,
                          exam.status === 'Ongoing' ? 'Upcoming' : 'Ongoing'
                        )
                      }
                      className={`p-2 rounded-lg transition-colors cursor-pointer text-xs ${
                        exam.status === 'Ongoing'
                          ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                      title={exam.status === 'Ongoing' ? 'Set as Upcoming' : 'Set as Ongoing'}
                    >
                      {exam.status === 'Ongoing' ? <FaPauseCircle /> : <FaPlayCircle />}
                    </button>

                    <button
                      onClick={() => handleOpenEdit(exam)}
                      className="p-2 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-800 rounded-lg transition-colors cursor-pointer"
                      title="Edit Exam"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDeleteExam(exam.id)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                      title="Delete Exam"
                    >
                      <FaTrash />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Exam Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900">
                {editingExam ? 'Edit Exam Details' : 'Schedule New Exam'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Subject</label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-hidden focus:border-indigo-600"
                >
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.name} ({sub.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Exam Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Start Time</label>
                  <input
                    type="text"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">End Time</label>
                  <input
                    type="text"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Previous">Previous / Expired</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Total Questions</label>
                  <input
                    type="number"
                    required
                    value={formData.totalQuestions}
                    onChange={(e) => setFormData({ ...formData, totalQuestions: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Exam Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md"
                >
                  {editingExam ? 'Save Changes' : 'Create Exam'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminExams;
