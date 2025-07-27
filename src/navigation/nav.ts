// src/navigation/nav.ts

export const nav = {
  login: {
    path: () => '/login',
    go: () => ({ pathname: '/login' }),
  },
  dashboard: {
    path: () => '/',
    go: () => ({ pathname: '/' }),
  },
  posts: {
    path: () => '/posts',
    go: () => ({ pathname: '/posts' }),
  },
  postDetail: {
    path: (id: number | string) => `/posts/${id}`,
    go: (params: { id: number | string }) => ({ pathname: `/posts/${params.id}` }),
  },
  editPost: {
    path: (id: number | string) => `/posts/${id}/edit`,
    go: (params: { id: number | string }) => ({ pathname: `/posts/${params.id}/edit` }),
  },
  postComments: {
    path: (id: number | string) => `/posts/${id}/comments`,
    go: (params: { id: number | string }) => ({ pathname: `/posts/${params.id}/comments` }),
  },
  createPost: {
    path: () => '/create',
    go: () => ({ pathname: '/create' }),
  },
  forbidden: {
    path: () => '/403',
    go: () => ({ pathname: '/403' }),
  },
}
