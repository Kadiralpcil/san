import { RouteParams } from "../types"

export const replacePath = (path: string, params?: RouteParams): string => {
  if (!params) return path
  
  let replacedPath = path
  Object.entries(params).forEach(([key, value]) => {
    replacedPath = replacedPath.replace(`:${key}`, String(value))
  })
  
  return replacedPath
}

export const buildFullPath = (routePath: string, parentPath = ''): string => {
  return parentPath + routePath
}