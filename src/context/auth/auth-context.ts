import { createContext } from 'react'
import { Login, User } from 'src/types'

export interface State {
  isInitialized: boolean
  isAuthenticated: boolean
  user: User | null
}

export const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
}

export interface AuthContextType extends State {
  signIn: (body: Login) => Promise<void>
  initialize: () => Promise<void>
  changePassword: (password: string, password_confirm: string) => Promise<void>
  updateCurrentUser: (user: any) => void
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signIn: () => Promise.resolve(),
  changePassword: () => Promise.resolve(),
  updateCurrentUser: (user: any) => user,
  initialize: () => Promise.resolve(),
  signOut: () => Promise.resolve()
})
