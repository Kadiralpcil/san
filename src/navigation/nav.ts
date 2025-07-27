import { useUser } from '../store/user'
import routes from './routes'

const user = useUser();

function buildPath(path: string, params: Record<string, string | number> = {}) {
  let built = path
  Object.keys(params).forEach((key) => {
    built = built.replace(`:${key}`, String(params[key]))
  })
  return built
}

const nav = routes.reduce((acc, route) => {
  acc[route.name] = {
    get: (params?: Record<string, any>) => buildPath(route.path, params),
    go: (params?: Record<string, any>) => {
      const path = buildPath(route.path, params)
      const hasPermission = !route.permissions || route.permissions.every(p => user.data?.permissions.includes(p))

      if (!hasPermission) {
        alert("You are not allowed to access this page.")
        return
      }

      window.history.pushState({}, '', path)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }
  return acc
}, {} as Record<string, { get: (params?: any) => string, go: (params?: any) => void }>)

export default nav
