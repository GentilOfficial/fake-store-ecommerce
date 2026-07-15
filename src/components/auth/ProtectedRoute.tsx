import { useAuth } from '@/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ authenticated = true }: { authenticated?: boolean }) => {
  const { isAuthenticated } = useAuth()

  if (authenticated !== isAuthenticated) {
    return <Navigate to={authenticated ? '/login' : '/'} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
