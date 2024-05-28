import { Employee, ForgotPassword, Holiday, Leaves, Login, ResetPassword, UpdatePassword } from 'src/types'

// ** AUTH Initial Values
export const LoginInitialValues: Login = {
  email: '',
  password: ''
}

export const ForgotPasswordInitialValues: ForgotPassword = {
  email: ''
}

export const ResetPasswordInitialValues: ResetPassword = {
  password: '',
  password_confirm: ''
}

export const UpdateMyPassword: UpdatePassword = {
  current_password: '',
  password: '',
  password_confirm: ''
}

// ** Employee Initial Values
export const employeeInitialValues: Employee = {
  username: '',
  full_name: '',
  mobile: undefined,
  role: 'admin',
  email: '',
  qualification: '',
  designation: '',
  company: '',
  account_status: 'active',
  national_identity_number: undefined
}

export const holidayInitialValues: Holiday = {
  _id: '',
  title: '',
  date: null,
  users: []
}

export const leaveInitialValues: Leaves = {
  _id: '',
  user: '',
  date: null,
  reason: '',
  leave_type: '',
  status: ''
}
