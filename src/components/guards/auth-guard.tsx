import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useAuth } from 'src/hooks/use-auth'
import { useRouter } from 'next/router'
import { paths } from 'src/contants/paths'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = props => {
  const { children } = props
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [checked, setChecked] = useState<boolean>(false)

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString()
      const href = paths.auth.login + `?${searchParams}`
      router.replace(href)
    } else {
      setChecked(true)
    }
  }, [isAuthenticated, router])

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(() => {
    check()
  }, [])

  if (!checked) {
    return null
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>
}

AuthGuard.propTypes = {
  children: PropTypes.node
}
