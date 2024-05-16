import { Login, UpdatePassword } from 'src/types'

export const LoginInitialValues: Login = {
  email: 'yonuskhan',
  password: 'yonus12385'
}

export const updateMyPassword: UpdatePassword = {
  current_password: '',
  password: '',
  password_confirm: ''
}
