import * as Yup from 'yup'

export const LoginValidation = Yup.object({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required').min(8, 'Password must have at least 8 characters')
})
