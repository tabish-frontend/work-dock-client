import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useAuth } from 'src/hooks/use-auth'
import { useRouter } from 'next/router'
import { paths } from 'src/contants/paths'

interface GuestGuardProps {
  children: ReactNode
}

export const GuestGuard: FC<GuestGuardProps> = props => {
  const { children } = props
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState<boolean>(false)

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(paths.index)
    } else {
      setChecked(true)
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    check()
  }, [])

  if (!checked) {
    return null
  }

  return <>{children}</>
}

GuestGuard.propTypes = {
  children: PropTypes.node
}
