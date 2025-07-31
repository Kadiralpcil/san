import { AppRoute } from "../types"
import { buildFullPath } from "./pathUtils"

export interface RouteInfo {
  route: AppRoute
  fullPath: string
}

export const findRouteByName = (
  routes: AppRoute[], 
  name: string, 
  parentPath = ''
): RouteInfo | null => {
  for (const route of routes) {
    const fullPath = buildFullPath(route.path, parentPath)
    
    if (route.name === name) {
      return { route, fullPath }
    }
    
    if (route.children) {
      const childResult = findRouteByName(route.children, name, fullPath + '/')
      if (childResult) {
        return childResult
      }
    }
  }
  
  return null
}