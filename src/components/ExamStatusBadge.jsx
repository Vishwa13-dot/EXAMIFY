import React from 'react';
import { FaPlayCircle, FaClock, FaCheckCircle } from 'react-icons/fa';

/**
 * ExamStatusBadge renders styled status tags: Ongoing (green), Upcoming (amber), Previous (slate).
 */
const ExamStatusBadge = ({ status }) => {
  switch (status) {
    case 'Ongoing':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300/80 animate-pulse">
          <FaPlayCircle className="text-emerald-600 text-xs" />
          <span>Ongoing</span>
        </span>
      );
    case 'Upcoming':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <FaClock className="text-amber-600 text-xs" />
          <span>Upcoming</span>
        </span>
      );
    case 'Previous':
    case 'Completed':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          <FaCheckCircle className="text-slate-500 text-xs" />
          <span>Completed</span>
        </span>
      );
  }
};

export default ExamStatusBadge;
