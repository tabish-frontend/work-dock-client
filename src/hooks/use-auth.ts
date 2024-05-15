import { useContext } from 'react'

import type { AuthContextType as JwtAuthContextType } from 'src/context/auth'
import { AuthContext } from 'src/context/auth'

type AuthContextType = JwtAuthContextType

export const useAuth = <T = AuthContextType>() => useContext(AuthContext) as unknown as T
