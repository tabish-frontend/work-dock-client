export interface User {
  _id: string
  full_name: string
  username: string
  role: string
}
export interface AuthState {
  isAuthenticated: boolean
  isInitialized: boolean
  user: User | null
}
export interface Login {
  email: string
  password: string
}

export interface ForgotPassword {
  email: string
}

export interface ResetPassword {
  password: string
  password_confirm: string
}

export interface UpdatePassword {
  current_password: string
  password: string
  password_confirm: string
}
