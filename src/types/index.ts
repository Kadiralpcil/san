import { ComponentType, LazyExoticComponent, ReactElement } from "react"

export type RouteParams = Record<string, string | number>

export type Permission = 'VIEW_POSTS' | 'VIEW_COMMENTS' | 'EDIT_POST' | 'CREATE_POST' | 'LOGIN'

export interface User {
  name: string
  permissions: string[]
}

export interface NavigationMethod {
  get: (params?: RouteParams) => string
  go: (params?: RouteParams) => void
}

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export type NavItem = {
  get: (params?: RouteParams) => string;
  go: (params?: RouteParams) => void;
};

export type GeneratedRouteNames = 
  | 'login'
  | 'dashboard' 
  | 'posts'
  | 'postDetail'
  | 'editPost'
  | 'postComments'
  | 'createPost'
  | 'forbidden';

  export type Nav = Record<GeneratedRouteNames, NavItem>;
export type  AppRoute = {
  name: string
  path: string
  renderer: {
    type: 'lazy' | 'element'
    component: ReactElement | LazyExoticComponent<ComponentType<any>> | (() => Promise<{ default: ComponentType<any> }>)
  }
  permissions?: Permission[]
  translations?: (() => Promise<void>)[]
  children?: AppRoute[]
}