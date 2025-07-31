import { Navigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import type { Permission } from '../../types'

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
   const user = useCurrentUser();

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
