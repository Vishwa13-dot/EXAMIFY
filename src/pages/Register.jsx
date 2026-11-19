import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { registerSchema } from '../validation/registerSchema';

/**
 * Register page for new student account creation with Formik + Yup validation.
 */
const Register = ({ users, onRegister }) => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      setErrorMsg('');
      setSuccessMessage('');

      // Check if username or email already exists
      const usernameExists = users.some(
        (u) => u.username.toLowerCase() === values.username.trim().toLowerCase()
      );

      if (usernameExists) {
        setErrorMsg('Username is already taken. Please choose another.');
        return;
      }

      const newUser = {
        id: `u-${Date.now()}`,
        fullName: values.fullName.trim(),
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
        role: 'Student',
        department: 'Computer Science',
        semester: '6th Semester',
        rollNumber: `CS2026${Math.floor(100 + Math.random() * 900)}`
      };

      onRegister(newUser);
      setSuccessMessage('Registration successful! Redirecting to login...');

      setTimeout(() => {
        navigate('/login', { state: { message: 'Registration successful! You can now log in.' } });
      }, 1500);
    }
  });

  return (
    <div className="space-y-5">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Registration</h2>
        <p className="text-xs text-slate-500 mt-1">Create your official student account for Examify.</p>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2.5 font-semibold">
          <FaCheckCircle className="text-emerald-600 text-base flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2 font-semibold">
          <FaExclamationTriangle className="text-rose-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-3.5">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FaUser className="text-xs" />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-9 pr-3.5 py-2 bg-slate-50 rounded-xl border text-xs text-slate-900 transition-all focus:outline-hidden ${
                formik.touched.fullName && formik.errors.fullName
                  ? 'border-rose-400 bg-rose-50/30'
                  : 'border-slate-300 focus:border-emerald-600 focus:bg-white'
              }`}
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="mt-1 text-[11px] text-rose-600 font-medium">{formik.errors.fullName}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FaUser className="text-xs" />
            </div>
            <input
              type="text"
              name="username"
              placeholder="john_doe"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-9 pr-3.5 py-2 bg-slate-50 rounded-xl border text-xs text-slate-900 transition-all focus:outline-hidden ${
                formik.touched.username && formik.errors.username
                  ? 'border-rose-400 bg-rose-50/30'
                  : 'border-slate-300 focus:border-emerald-600 focus:bg-white'
              }`}
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <p className="mt-1 text-[11px] text-rose-600 font-medium">{formik.errors.username}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FaEnvelope className="text-xs" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="john.doe@college.edu"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-9 pr-3.5 py-2 bg-slate-50 rounded-xl border text-xs text-slate-900 transition-all focus:outline-hidden ${
                formik.touched.email && formik.errors.email
                  ? 'border-rose-400 bg-rose-50/30'
                  : 'border-slate-300 focus:border-emerald-600 focus:bg-white'
              }`}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-[11px] text-rose-600 font-medium">{formik.errors.email}</p>
          )}
        </div>

        {/* Password & Confirm Password side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FaLock className="text-xs" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border text-xs text-slate-900 transition-all focus:outline-hidden ${
                  formik.touched.password && formik.errors.password
                    ? 'border-rose-400 bg-rose-50/30'
                    : 'border-slate-300 focus:border-emerald-600 focus:bg-white'
                }`}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-[10px] text-rose-600 font-medium">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FaLock className="text-xs" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border text-xs text-slate-900 transition-all focus:outline-hidden ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-rose-400 bg-rose-50/30'
                    : 'border-slate-300 focus:border-emerald-600 focus:bg-white'
                }`}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="mt-1 text-[10px] text-rose-600 font-medium">{formik.errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 transform active:scale-98"
        >
          <span>Complete Registration</span>
          <FaUserPlus />
        </button>
      </form>

      {/* Login Link */}
      <div className="text-center text-xs text-slate-600 pt-2 border-t border-slate-100">
        <span>Already registered? </span>
        <Link to="/login" className="font-bold text-emerald-600 hover:underline">
          Sign In Here
        </Link>
      </div>

    </div>
  );
};

export default Register;
