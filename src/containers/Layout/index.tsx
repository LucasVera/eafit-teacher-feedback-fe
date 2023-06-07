import { ReactNode } from 'react'
import AuthGuard from '../../components/AuthGuard'

interface LayoutProps {
  children?: ReactNode
}

export default function Layout(props: LayoutProps) {
  const {
    children
  } = props
  return (
    <div>
      <AuthGuard>
        {children}
      </AuthGuard>
    </div>
  )
}
