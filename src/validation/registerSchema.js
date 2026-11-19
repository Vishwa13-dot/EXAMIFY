import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(2, 'Full Name must be at least 2 characters')
    .required('Full Name is required'),
  username: Yup.string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores')
    .required('Username is required'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password')
});
