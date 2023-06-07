import { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode,
}

export default function AuthGuard(props: AuthGuardProps) {
  const {
    children,
  } = props

  // for now, it's a pass-through. in the future when auth is implemented,
  // this will be the place to check if the user is logged in and redirect if not
  return <>{children}</>
}

