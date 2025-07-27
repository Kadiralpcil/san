import { lazy, ReactElement, ComponentType, LazyExoticComponent, createElement } from 'react'
import Login from '../pages/Login'
import ForbiddenPage from '../pages/403'
// import ForbiddenPage from '../pages/ForbiddenPage'

type Permission = 'VIEW_POSTS' | 'VIEW_COMMENTS' | 'EDIT_POST' | 'CREATE_POST' | 'LOGIN'

interface AppRoute {
  name: string
  path: string
  renderer: {
    type: 'lazy' | 'element'
    component: ReactElement | LazyExoticComponent<ComponentType<any>> | (() => Promise<{ default: ComponentType<any> }>)
  }
  permissions?: Permission[]
  translations?: (() => Promise<void>)[]
}

// Lazy-loaded components
const Dashboard = lazy(() => import('../pages/Dashboard'))
const PostList = lazy(() => import('../pages/Posts'))
const PostDetail = lazy(() => import('../pages/Posts/PostDetail'))
const EditPost = lazy(() => import('../pages/Posts/EditPostTab'))
const PostComments = lazy(() => import('../pages/Posts/PostCommentsTab'))
const CreatePost = lazy(() => import('../pages/CreatePost'))

const routes: AppRoute[] = [
  {
    name: 'login',
    path: '/login',
    renderer: {
      type: 'element',
      component: createElement(Login),
    },
    translations: [() => Promise.resolve()],
  },
  {
    name: 'dashboard',
    path: '/',
    renderer: {
      type: 'lazy',
      component: Dashboard,
    },
    permissions: ['LOGIN'],
    translations: [() => Promise.resolve()],
  },
  {
    name: 'posts',
    path: '/posts',
    renderer: {
      type: 'lazy',
      component: PostList,
    },
    permissions: ['VIEW_POSTS'],
    translations: [() => Promise.resolve()],
  },
  {
    name: 'post-detail',
    path: '/posts/:id',
    renderer: {
      type: 'lazy',
      component: PostDetail,
    },
    permissions: ['VIEW_POSTS'],
    translations: [() => Promise.resolve()],
  },
  {
    name: 'edit-post',
    path: '/posts/:id/edit',
    renderer: {
      type: 'lazy',
      component: EditPost,
    },
    permissions: ['EDIT_POST'],
    translations: [() => Promise.resolve()],
  },
  {
    name: 'post-comments',
    path: '/posts/:id/comments',
    renderer: {
      type: 'lazy',
      component: PostComments,
    },
    permissions: ['VIEW_COMMENTS'],
    translations: [() => Promise.resolve()],
  },
  {
    name: 'create-post',
    path: '/create',
    renderer: {
      type: 'lazy',
      component: CreatePost,
    },
    permissions: ['CREATE_POST'],
    translations: [() => Promise.resolve()],
  },
  {
    name: 'forbidden',
    path: '/403',
    renderer: {
      type: 'element',
      component: createElement(ForbiddenPage)
    },
  },
]

export default routes
export type { AppRoute, Permission }