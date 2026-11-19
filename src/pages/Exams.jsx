import React, { useState } from 'react';
import { FaSearch, FaFilter, FaBookOpen } from 'react-icons/fa';
import ExamCard from '../components/ExamCard';
import { subjects } from '../data/subjects';

/**
 * Exams page providing subject catalog view, searching, and filtering.
 */
const Exams = ({ exams, userResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Filter logic
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject = selectedSubject === 'ALL' || exam.subjectId === selectedSubject;

    const isAttempted = userResults.some((r) => r.examId === exam.id);
    const effectiveStatus = isAttempted ? 'Completed' : exam.status;
    const matchesStatus = selectedStatus === 'ALL' || effectiveStatus === selectedStatus;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Examinations Catalog</h2>
        <p className="text-xs text-slate-500 mt-1">Browse active, scheduled, and past subject tests across all academic disciplines.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        
        {/* Search Bar */}
        <div className="sm:col-span-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FaSearch className="text-xs" />
          </div>
          <input
            type="text"
            placeholder="Search by subject name, code, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white"
          />
        </div>

        {/* Subject Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-emerald-600"
          >
            <option value="ALL">All 7 Subjects</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-emerald-600"
          >
            <option value="ALL">All Statuses</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed / Attempted</option>
          </select>
        </div>

      </div>

      {/* Exam Grid */}
      {filteredExams.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
          <FaBookOpen className="text-3xl text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No matching examinations found</p>
          <p className="text-xs text-slate-400">Try adjusting your search terms or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExams.map((exam) => {
            const attempt = userResults.find((r) => r.examId === exam.id);
            return (
              <ExamCard
                key={exam.id}
                exam={exam}
                attemptResult={attempt}
                onSelectDetails={() => {}}
              />
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Exams;
