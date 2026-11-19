import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Storage utility
import { getSecureData, setSecureData } from './utils/secureStorage';

// Initial Data imports
import { initialUsers } from './data/users';
import { initialExams } from './data/exams';
import { subjects as initialSubjects } from './data/subjects';
import { questionsData as initialQuestionsData } from './data/questions';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Components & Guards
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Student Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import ExamInstructions from './pages/ExamInstructions';
import Exam from './pages/Exam';
import Result from './pages/Result';
import Results from './pages/Results';
import Profile from './pages/Profile';
import ExamTerminated from './pages/ExamTerminated';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminExams from './pages/admin/AdminExams';
import CreateExam from './pages/admin/CreateExam';
import AdminSubjects from './pages/admin/AdminSubjects';
import AdminQuestions from './pages/admin/AdminQuestions';
import AdminStudents from './pages/admin/AdminStudents';
import AdminResults from './pages/admin/AdminResults';

/**
 * Root Application component maintaining top-level React state.
 * Uses secureStorage helper for persistence across page refreshes.
 */
function App() {
  // Master React States initialized with SecureLS / fallback storage
  const [users, setUsers] = useState(() => getSecureData('users', initialUsers));
  const [currentUser, setCurrentUser] = useState(() => getSecureData('currentUser', null));
  const [exams, setExams] = useState(() => getSecureData('exams', initialExams));
  const [subjectsList, setSubjectsList] = useState(() => getSecureData('subjects', initialSubjects));
  const [questionsMap, setQuestionsMap] = useState(() => getSecureData('questions', initialQuestionsData));
  
  const [userResults, setUserResults] = useState(() =>
    getSecureData('userResults', [
      {
        id: 'res-sample-1',
        examId: 'exam-startups-101',
        subjectId: 'sub-startups',
        subject: 'Startups',
        examCode: 'MG601',
        studentName: 'Alex Smith',
        studentUsername: 'alex_smith',
        submittedAt: '2026-09-20 02:00 PM',
        totalQuestions: 20,
        score: 18,
        percentage: 90,
        correctCount: 18,
        wrongCount: 2,
        unansweredCount: 0,
        timeTakenFormatted: '48m 10s',
        submissionType: 'Submitted by Student',
        userAnswers: {
          0: 1, 1: 1, 2: 1, 3: 0, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1,
          10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 0, 16: 2, 17: 1, 18: 0, 19: 0
        }
      }
    ])
  );

  // Sync state changes to secureStorage
  useEffect(() => {
    setSecureData('users', users);
  }, [users]);

  useEffect(() => {
    setSecureData('currentUser', currentUser);
  }, [currentUser]);

  useEffect(() => {
    setSecureData('exams', exams);
  }, [exams]);

  useEffect(() => {
    setSecureData('subjects', subjectsList);
  }, [subjectsList]);

  useEffect(() => {
    setSecureData('questions', questionsMap);
  }, [questionsMap]);

  useEffect(() => {
    setSecureData('userResults', userResults);
  }, [userResults]);

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    setSecureData('currentUser', user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSecureData('currentUser', null);
  };

  const handleRegister = (newUser) => {
    setUsers((prev) => {
      const updated = [...prev, newUser];
      setSecureData('users', updated);
      return updated;
    });
  };

  const handleCompleteExam = (resultObj) => {
    setUserResults((prev) => {
      const updated = [resultObj, ...prev];
      setSecureData('userResults', updated);
      return updated;
    });

    setExams((prevExams) => {
      const updatedExams = prevExams.map((ex) =>
        ex.id === resultObj.examId ? { ...ex, status: 'Previous' } : ex
      );
      setSecureData('exams', updatedExams);
      return updatedExams;
    });
  };

  // Admin Exam Handlers
  const handleAddExam = (newExam) => {
    setExams((prev) => {
      const updated = [newExam, ...prev];
      setSecureData('exams', updated);
      return updated;
    });
  };

  const handleAddExamWithQuestions = (newExamObj, subjectId, newQuestionsList) => {
    // Add new exam to exams state
    setExams((prev) => {
      const updatedExams = [newExamObj, ...prev];
      setSecureData('exams', updatedExams);
      return updatedExams;
    });

    // Add or update questions for the subject in questionsMap
    setQuestionsMap((prev) => {
      const updatedMap = {
        ...prev,
        [subjectId]: newQuestionsList
      };
      setSecureData('questions', updatedMap);
      return updatedMap;
    });
  };

  const handleEditExam = (updatedExam) => {
    setExams((prev) => {
      const updated = prev.map((ex) => (ex.id === updatedExam.id ? updatedExam : ex));
      setSecureData('exams', updated);
      return updated;
    });
  };

  const handleDeleteExam = (examId) => {
    setExams((prev) => {
      const updated = prev.filter((ex) => ex.id !== examId);
      setSecureData('exams', updated);
      return updated;
    });
  };

  const handleUpdateExamStatus = (examId, newStatus) => {
    setExams((prev) => {
      const updated = prev.map((ex) => (ex.id === examId ? { ...ex, status: newStatus } : ex));
      setSecureData('exams', updated);
      return updated;
    });
  };

  // Admin Subject Handlers
  const handleAddSubject = (newSubject) => {
    setSubjectsList((prev) => {
      const updated = [...prev, newSubject];
      setSecureData('subjects', updated);
      return updated;
    });
  };

  const handleEditSubject = (updatedSubject) => {
    setSubjectsList((prev) => {
      const updated = prev.map((s) => (s.id === updatedSubject.id ? updatedSubject : s));
      setSecureData('subjects', updated);
      return updated;
    });
  };

  // Admin Question Handlers
  const handleAddQuestion = (subjectId, newQuestion) => {
    setQuestionsMap((prev) => {
      const updated = {
        ...prev,
        [subjectId]: [...(prev[subjectId] || []), newQuestion]
      };
      setSecureData('questions', updated);
      return updated;
    });
  };

  const handleEditQuestion = (subjectId, updatedQuestion) => {
    setQuestionsMap((prev) => {
      const updated = {
        ...prev,
        [subjectId]: (prev[subjectId] || []).map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        )
      };
      setSecureData('questions', updated);
      return updated;
    });
  };

  const handleDeleteQuestion = (subjectId, questionId) => {
    setQuestionsMap((prev) => {
      const updated = {
        ...prev,
        [subjectId]: (prev[subjectId] || []).filter((q) => q.id !== questionId)
      };
      setSecureData('questions', updated);
      return updated;
    });
  };

  // Admin Student Handler
  const handleAddStudent = (newStudent) => {
    setUsers((prev) => {
      const updated = [...prev, newStudent];
      setSecureData('users', updated);
      return updated;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Unauthenticated Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login users={users} onLogin={handleLogin} />} />
          <Route path="/register" element={<Register users={users} onRegister={handleRegister} />} />
        </Route>

        {/* Authenticated Student Routes */}
        <Route
          element={
            <ProtectedRoute currentUser={currentUser}>
              <StudentLayout currentUser={currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <Dashboard
                currentUser={currentUser}
                exams={exams}
                userResults={userResults}
              />
            }
          />
          <Route
            path="/exams"
            element={<Exams exams={exams} userResults={userResults} />}
          />
          <Route
            path="/exams/:id/instructions"
            element={<ExamInstructions exams={exams} userResults={userResults} />}
          />
          <Route
            path="/results"
            element={<Results userResults={userResults} />}
          />
          <Route
            path="/results/:id"
            element={<Result userResults={userResults} currentUser={currentUser} />}
          />
          <Route
            path="/exams/:id/terminated"
            element={<ExamTerminated userResults={userResults} exams={exams} />}
          />
          <Route
            path="/profile"
            element={<Profile currentUser={currentUser} userResults={userResults} />}
          />
        </Route>

        {/* Authenticated Admin Console Routes */}
        <Route
          element={
            <AdminRoute currentUser={currentUser}>
              <AdminLayout currentUser={currentUser} onLogout={handleLogout} />
            </AdminRoute>
          }
        >
          <Route
            path="/admin/dashboard"
            element={
              <AdminDashboard
                users={users}
                exams={exams}
                subjects={subjectsList}
                questionsData={questionsMap}
                userResults={userResults}
              />
            }
          />
          <Route
            path="/admin/exams"
            element={
              <AdminExams
                exams={exams}
                subjects={subjectsList}
                onAddExam={handleAddExam}
                onEditExam={handleEditExam}
                onDeleteExam={handleDeleteExam}
                onUpdateStatus={handleUpdateExamStatus}
              />
            }
          />
          <Route
            path="/admin/exams/create"
            element={
              <CreateExam
                subjects={subjectsList}
                onAddExamWithQuestions={handleAddExamWithQuestions}
              />
            }
          />
          <Route
            path="/admin/subjects"
            element={
              <AdminSubjects
                subjects={subjectsList}
                exams={exams}
                questionsData={questionsMap}
                onAddSubject={handleAddSubject}
                onEditSubject={handleEditSubject}
              />
            }
          />
          <Route
            path="/admin/questions"
            element={
              <AdminQuestions
                subjects={subjectsList}
                questionsData={questionsMap}
                onAddQuestion={handleAddQuestion}
                onEditQuestion={handleEditQuestion}
                onDeleteQuestion={handleDeleteQuestion}
              />
            }
          />
          <Route
            path="/admin/students"
            element={
              <AdminStudents
                users={users}
                userResults={userResults}
                onAddStudent={handleAddStudent}
              />
            }
          />
          <Route
            path="/admin/results"
            element={
              <AdminResults
                userResults={userResults}
                subjects={subjectsList}
              />
            }
          />
        </Route>

        {/* Active Student Examination Route */}
        <Route
          path="/exams/:id"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Exam
                exams={exams}
                currentUser={currentUser}
                onCompleteExam={handleCompleteExam}
                userResults={userResults}
              />
            </ProtectedRoute>
          }
        />

        {/* Fallback Redirect */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                currentUser
                  ? currentUser.role === 'Admin'
                    ? '/admin/dashboard'
                    : '/dashboard'
                  : '/login'
              }
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
