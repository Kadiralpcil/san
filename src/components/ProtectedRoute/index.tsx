import { Navigate } from 'react-router-dom'
import { useUser } from '../../store/user'
import { Permission } from '../../navigation/routes'
import Spinner from '../ui/Spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  permissions: Permission[]
  fallbackPath?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permissions,
  fallbackPath = '/403',
}) => {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return <Spinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const hasRequiredPermissions = permissions.every((permission) =>
    user.permissions.includes(permission)
  )

  if (!hasRequiredPermissions) {
    return <Navigate to={fallbackPath} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
