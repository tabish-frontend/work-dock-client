'use client'

import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { authApi } from 'src/api/auth'

import type { State } from './auth-context'
import { AuthContext, initialState } from './auth-context'
import { User } from 'src/types'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

const STORAGE_KEY = 'accessToken'

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  CHANGE_PSWD = 'CHANGE_PSWD'
}

type InitializeAction = {
  type: ActionType.INITIALIZE
  payload: {
    isAuthenticated: boolean
    user: User | null
  }
}

type SignInAction = {
  type: ActionType.SIGN_IN
  payload: {
    user: User
  }
}

type ChangePswdAction = {
  type: ActionType.CHANGE_PSWD
  payload: {
    user: User
  }
}

type SignUpAction = {
  type: ActionType.SIGN_UP
  payload: {
    user: User
  }
}

type SignOutAction = {
  type: ActionType.SIGN_OUT
}

type Action = InitializeAction | SignInAction | SignUpAction | SignOutAction | ChangePswdAction

type Handler = (state: State, action: any) => State

const handlers: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    }
  },
  SIGN_IN: (state: State, action: SignInAction): State => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user
    }
  },
  CHANGE_PSWD: (state: State, action: ChangePswdAction): State => {
    const { user } = action.payload

    return {
      ...state,
      user
    }
  },
  SIGN_UP: (state: State, action: SignUpAction): State => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user
    }
  },
  SIGN_OUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
}

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = props => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, initialState)

  const initialize = useCallback(async (): Promise<void> => {
    try {
      const cookie = Cookies.get('accessToken')

      if (cookie) {
        const decodedUser: User = jwtDecode(cookie)
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            user: {
              _id: decodedUser._id,
              full_name: decodedUser.full_name,
              username: decodedUser.username,
              role: decodedUser.role
            }
          }
        })
      } else {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        })
      }
    } catch (err) {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          user: null
        }
      })
    }
  }, [dispatch])

  useEffect(() => {
    initialize()
  }, [])

  const signIn = useCallback(
    async (body): Promise<void> => {
      const response = await authApi.signIn(body)
      const token = response?.data.accessToken
      const decodedUser: User = jwtDecode(token)

      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user: {
            _id: decodedUser._id,
            full_name: decodedUser.full_name,
            username: decodedUser.username,
            role: decodedUser.role
          }
        }
      })
    },
    [dispatch]
  )

  const changePassword = useCallback(async (): Promise<void> => {
    //
  }, [])

  const signOut = useCallback(async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: ActionType.SIGN_OUT })
  }, [dispatch])

  const updateCurrentUser = useCallback(
    (user: any) => {
      dispatch({
        type: ActionType.SIGN_IN,
        payload: {
          user: user.data
        }
      })
    },
    [dispatch]
  )

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        changePassword,
        initialize,
        signOut,
        updateCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
