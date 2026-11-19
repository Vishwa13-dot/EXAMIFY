import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { loginSchema } from '../validation/loginSchema';

/**
 * Login page using Formik + Yup validation and React state authentication.
 */
const Login = ({ users, onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmittingState, setIsSubmittingState] = useState(false);

  const redirectMessage = location.state?.message;

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setAuthError('');
      setIsSubmittingState(true);

      // Simulate quick network response state
      setTimeout(() => {
        // Authenticate against users state
        const matchedUser = users.find(
          (u) =>
            u.username.toLowerCase() === values.username.trim().toLowerCase() &&
            u.password === values.password
        );

        if (matchedUser) {
          onLogin(matchedUser);
          if (matchedUser.role === 'Admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        } else {
          setAuthError('Invalid username or password');
        }
        setIsSubmittingState(false);
      }, 500);
    }
  });

  // Quick fill helper for testing
  const handleQuickFill = (uname, pwd) => {
    formik.setFieldValue('username', uname);
    formik.setFieldValue('password', pwd);
    setAuthError('');
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Login</h2>
        <p className="text-xs text-slate-500 mt-1">Enter your credentials to access the examination portal.</p>
      </div>

      {/* Notice Message if redirected from protected route */}
      {redirectMessage && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
          <FaInfoCircle className="text-amber-600 flex-shrink-0" />
          <span>{redirectMessage}</span>
        </div>
      )}

      {/* Invalid credentials alert */}
      {authError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2.5 font-medium animate-shake">
          <FaExclamationTriangle className="text-rose-600 flex-shrink-0 text-sm" />
          <span>{authError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        
        {/* Username Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FaUser className="text-sm" />
            </div>
            <input
              type="text"
              name="username"
              placeholder="e.g. john_doe or admin"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border text-sm text-slate-900 transition-all focus:outline-hidden ${
                formik.touched.username && formik.errors.username
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 hover:border-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-200'
              }`}
            />
          </div>
          {formik.touched.username && formik.errors.username && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{formik.errors.username}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FaLock className="text-sm" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full pl-10 pr-10 py-2.5 bg-slate-50 rounded-xl border text-sm text-slate-900 transition-all focus:outline-hidden ${
                formik.touched.password && formik.errors.password
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 hover:border-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{formik.errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmittingState}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-70"
        >
          {isSubmittingState ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Signing In...</span>
            </span>
          ) : (
            <>
              <span>Login to Portal</span>
              <FaSignInAlt />
            </>
          )}
        </button>
      </form>

      {/* Demo Credentials Section */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Test Login (Demo Accounts):</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill('admin', 'admin123')}
            className="px-2.5 py-1 text-[11px] font-mono bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold rounded-lg border border-indigo-200 cursor-pointer transition-colors"
          >
            🔑 admin / admin123 (Admin)
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill('john_doe', 'password123')}
            className="px-2.5 py-1 text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 cursor-pointer transition-colors"
          >
            john_doe / password123 (Student)
          </button>
        </div>
      </div>

      {/* Registration Redirect */}
      <div className="text-center text-xs text-slate-600 pt-2">
        <span>Don't have a student account? </span>
        <Link to="/register" className="font-bold text-emerald-600 hover:underline">
          Register Here
        </Link>
      </div>

    </div>
  );
};

export default Login;
